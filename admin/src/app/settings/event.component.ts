import { SettingsService } from '../_services/settings.service';
import { Component, ViewEncapsulation, ViewChild, ViewContainerRef } from '@angular/core';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { FormBuilder, Validators, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { Events, Group, Department, Training, AgeGroup, EventDetail, EventAudience , EventCategory} from '../_models/utility';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { MomentModule } from 'angular2-moment/moment.module';
import * as moment from 'moment';
import * as _ from "lodash";
import { TabsetConfig } from 'ngx-bootstrap/tabs';
import { TabsetComponent } from 'ngx-bootstrap';


export function getTabsetConfig(): TabsetConfig {
    return Object.assign(new TabsetConfig(), { type: 'pills' });
}


@Component({
    moduleId: 'az-settings-events',
    selector: 'events',
    templateUrl: 'event.component.html',
    providers: [SettingsService, ToasterService, { provide: TabsetConfig, useFactory: getTabsetConfig }]
})
export class EventComponent {

    private toasterService: ToasterService;

    public wkDays: Array<string> = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    public durUnit: Array<string> = ['MINUTES', 'HOURS', 'DAYS', 'WEEKS', 'MONTH', 'YEARS'];
    public period: Array<string> = ['DAILY', 'WEEKLY', 'BI-WEEKLY', 'FORTNIGHT', 'MONTHLY', 'QUATERLY', 'SEMI-YEALY', 'YEARLY'];
    public dayMth: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18',
        '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    public mths: Array<string> = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

    private period_value: any = ['WEEKLY'];
    private duration_value: any = ['HOURS'];
    private dept_value: any = [''];
    private cat_value: any = [''];
    private grp_value: any = [''];
    private trg_value: any = [''];
    private wkday_value: any = [''];
    private age_value: any = [''];
    private date_mth_from: any = [''];
    private date_mth_to: any = [''];
    private month_from: any = [''];
    private month_to: any = [''];

    private events: EventDetail[];
    private eventcategories: EventCategory[];

    private groups: Group[];
    private departments: Department[];
    private trainings: Training[];
    private agegroups: AgeGroup[];



    private groupNameArray: Array<string> = new Array<string>();
    private catNameArray: Array<string> = new Array<string>();
    private departNameArray: Array<string> = new Array<string>();
    private trgNameArray: Array<string> = new Array<string>();
    private ageNameArray: Array<string> = new Array<string>();



    public eventFormGroup: FormGroup;
    public event_name: AbstractControl;
    public event_description: AbstractControl;
    public event_repeated: AbstractControl;
    public event_duration: AbstractControl;
    public event_period: AbstractControl;
    public event_note: AbstractControl;
    public event_date_started: AbstractControl;
    public event_date_ended: AbstractControl;
    public event_time_start: AbstractControl;
    public event_time_end: AbstractControl;
    public event_duration_unit: AbstractControl;
    public event_depart: AbstractControl;
    public event_group: AbstractControl;
    public event_venue: AbstractControl;
    public event_trg: AbstractControl;
    public event_wkday: AbstractControl;
    public event_age: AbstractControl;
    public event_date_mth_from: AbstractControl;
    public event_date_mth_to: AbstractControl;
    public event_mth_from: AbstractControl;
    public event_mth_to: AbstractControl;
    public event_category: AbstractControl;

    public categoryFormGroup: FormGroup;
    public grp_name: AbstractControl;
    public grp_descrip: AbstractControl;




    loading = false;
    selected = [];

    public hstep: number = 1;
    public mstep: number = 15;
    public ismeridian: boolean = true;
    public isEnabled: boolean = true;

    public mytime: Date = new Date();
    public start_time: Date = new Date();
    public end_time: Date = new Date();

    

    public toasterconfig: ToasterConfig =
    new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
    });


    constructor(private _settingsService: SettingsService,
        public fb: FormBuilder, private _sanitizer: DomSanitizer) {


        //Initialize Group Form
        this.eventFormGroup = this.fb.group({
            'event_name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'event_description': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'event_repeated': [false],
            'event_duration': ['', Validators.compose([Validators.minLength(1)])],
            'event_date_start': [''],
            'event_date_end': [''],
            'event_time_start': [''],
            'event_time_end': [''],
            'event_depart': [''],
            'event_group': [''],
            'event_wkday': [''],
            'event_trg': [''],
            'event_age': [''],
            'event_duration_unit': [''],
            'event_period': [''],
            'event_date_mth_from': [''],
            'event_date_mth_to': [''],
            'event_mth_from': [''],
            'event_mth_to': [''],
            'event_category':[''],
            'event_note': ['', Validators.compose([Validators.minLength(3)])],
            'event_venue': ['', Validators.compose([Validators.minLength(3)])]
        });

        //Initialize Group Form
        this.categoryFormGroup = this.fb.group({
            'grp_name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'grp_descrip': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });

        this.event_name = this.eventFormGroup.controls['event_name'];
        this.event_description = this.eventFormGroup.controls['event_description'];
        this.event_repeated = this.eventFormGroup.controls['event_repeated'];
        this.event_duration = this.eventFormGroup.controls['event_duration'];
        this.event_duration_unit = this.eventFormGroup.controls['event_duration_unit'];
        this.event_date_started = this.eventFormGroup.controls['event_date_start'];
        this.event_date_ended = this.eventFormGroup.controls['event_date_end'];
        this.event_time_start = this.eventFormGroup.controls['event_time_start'];
        this.event_time_end = this.eventFormGroup.controls['event_time_end'];
        this.event_depart = this.eventFormGroup.controls['event_depart'];
        this.event_group = this.eventFormGroup.controls['event_group'];
        this.event_period = this.eventFormGroup.controls['event_period'];
        this.event_note = this.eventFormGroup.controls['event_note'];
        this.event_venue = this.eventFormGroup.controls['event_venue'];
        this.event_wkday = this.eventFormGroup.controls['event_wkday'];
        this.event_trg = this.eventFormGroup.controls['event_trg'];
        this.event_age = this.eventFormGroup.controls['event_age'];
        this.event_date_mth_from = this.eventFormGroup.controls['event_date_mth_from'];
        this.event_date_mth_to = this.eventFormGroup.controls['event_date_mth_to'];
        this.event_mth_from = this.eventFormGroup.controls['event_mth_from'];
        this.event_mth_to = this.eventFormGroup.controls['event_mth_to'];
        this.event_category = this.eventFormGroup.controls['event_category'];

        this.grp_name = this.categoryFormGroup.controls['grp_name'];
        this.grp_descrip = this.categoryFormGroup.controls['grp_descrip'];

    }

    ngOnInit() {
        this.getDepartments();
        this.getGroups();
        this.getTrainings();
        this.getAgeGroups();
        this.getEvents();
        this.getEventsCategories();
    }
    onSelectCategoryTable({ selected }) {
        console.log('Select Event', selected, this.selected);
        (<HTMLInputElement>document.getElementById("grp_name")).value = selected[0].name;
        (<HTMLInputElement>document.getElementById("grp_descrip")).value = selected[0].description;
        
        (<HTMLInputElement>document.getElementById("grp_name")).disabled = true;
    }
    private getEvents() {
        this._settingsService.getAllEventDetails().subscribe(p => {
            this.events = p;

        });
    }

    private getEventsCategories() {
        
        this._settingsService.getAllEventCategory().subscribe(p => {
            this.eventcategories = p;
            
            let catArr = new Array<string>();
            this.eventcategories.forEach(function (item) {
                catArr.push(item.name);
            });
            this.catNameArray = catArr;
        });
    }

    private getGroups() {
        this._settingsService.getGroups().subscribe(p => {
            this.groups = p;
            let grpArr = new Array<string>();
            this.groups.forEach(function (item) {
                grpArr.push(item.name);
            });
            this.groupNameArray = grpArr;
        });
    }

    private getDepartments() {
        this._settingsService.getDepartment().subscribe(p => {
            this.departments = p;
            let dptArr = new Array<string>();
            this.departments.forEach(function (item) {
                dptArr.push(item.name);
            });
            this.departNameArray = dptArr;
        });
    }

    

    private getAgeGroups() {
        this._settingsService.getAgeGroups().subscribe(p => {
            this.agegroups = p;
            let ageArr = new Array<string>();
            this.agegroups.forEach(function (item) {
                ageArr.push(item.code);
            });
            this.ageNameArray = ageArr;
        });
    }

    private getTrainings() {
        this._settingsService.getTrainings().subscribe(p => {
            this.trainings = p;
            let trgArr = new Array<string>();
            this.trainings.forEach(function (item) {
                trgArr.push(item.name);
            });
            this.trgNameArray = trgArr;
        });
    }

    public refreshValue(value: any): void {
        this.period_value = value;
    }

    public dept_selected(value: any): void {
        this.dept_value = value;
        console.log('Selected value is: ', value);
    }
    public grp_selected(value: any): void {
        this.grp_value = value;
        console.log('Selected value is: ', value);
    }
    public trg_selected(value: any): void {
        this.trg_value = value;
        console.log('Selected value is: ', value);
    }
    public duration_selected(value: any): void {
        this.duration_value = value;
        console.log('Selected value is: ', value);
    }

    public period_selected(value: any): void {
        this.period_value = value;
        console.log('Selected value is: ', value);
    }

    public wkday_selected(value: any): void {
        this.wkday_value = value;
        console.log('Selected value is: ', value);
    }

    public age_selected(value: any): void {
        this.age_value = value;
        console.log('Selected value is: ', value);
    }

    public datemthfrom_selected(value: any): void {
        this.date_mth_from = value;
        console.log('Selected value is: ', value);
    }

    public datemthto_selected(value: any): void {
        this.date_mth_to = value;
        console.log('Selected value is: ', value);
    }

    public mthfrom_selected(value: any): void {
        this.month_from = value;
        console.log('Selected value is: ', value);
    }

    public mthto_selected(value: any): void {
        this.month_to = value;
        console.log('Selected value is: ', value);
    }

    public category_selected(value: any): void {
        this.cat_value = value;
        console.log('Selected value is: ', value);
    }


    public refreshDeptValue(value: any): void {
        this.dept_value = value;
    }

    public refreshCategoryValue(value: any): void {
        this.cat_value = value;
    }

    public refreshGrpValue(value: any): void {
        this.grp_value = value;
    }

    public refreshTrgValue(value: any): void {
        this.trg_value = value;
    }

    public refreshDurationValue(value: any): void {
        this.duration_value = value;
    }

    public refreshPeriodValue(value: any): void {
        this.period_value = value;
    }

    public refreshWkDayValue(value: any): void {
        this.wkday_value = value;
    }

    public refreshAgeValue(value: any): void {
        this.age_value = value;
    }

    public refreshDateMthFromValue(value: any): void {
        this.date_mth_from = value;
    }

    public refreshDateMthToValue(value: any): void {
        this.date_mth_to = value;
    }

    public refreshMthFromValue(value: any): void {
        this.month_from = value;
    }
    public refreshMthToValue(value: any): void {
        this.month_to = value;
    }




    public start_time_changed(): void {
        console.log('Time changed to: ' + this.start_time);
    };

    public end_time_changed(): void {
        console.log('Time changed to: ' + this.end_time);
    };

    showSuccess(msg: string) {
        this.toasterService.pop('success', 'Ijosin: Event', msg);
    }

    showError(msg: string) {
        this.toasterService.pop('error', 'Ijosin: Event', msg);
    }

    showWarning(msg: string) {
        this.toasterService.pop('warning', 'Ijosin: Event', msg);
    }

    showInfo(msg: string) {
        this.toasterService.pop('info', 'Ijosin: Event', msg);
    }

    showPrimary(msg: string) {
        this.toasterService.pop('primary', 'Ijosin: Event', msg);
    }


    public clear(): void {
        this.end_time = void 0;
        this.start_time = void 0;
    };

    public removed(value: any): void {
        console.log('Removed value is: ', value);
    }
    public extractValueFromControl(value: any[]): any {
        if (value.length == 0) {
            return "";
        }
        if (value.length == 1) {
            return value[0]["text"];
        }
        if (value.length > 1) {
            let retval = new Array<any>();
            for (let item in value) {
                retval.push(item["text"]);
            }
            return retval;
        }
    }


    onActivate(event) {
        console.log('Activate Event', event);
    }

    public onEventSubmit(values: Object): void {
        let event_cat = this.extractValueFromControl(values['event_category']);
        let event_catgory = _.find(this.eventcategories, function(o) { return o.name ==event_cat });

        if (this.eventFormGroup.valid) {
            this.loading = true;
            if (_.isObject(values['event_name']['id']) && values['event_name']['id'] > 0) {
                console.log("Event Already Exist. Updating");
                //this.onEventUpdateSubmit(values);
                return;
            }
            //let d1 = moment(values['event_date_start'],'YYYY-MM-DD');
            console.log(values['event_time_start']);
            let regSt = <EventDetail>({
                id: 0,
                created_at: new Date(),
                updated_at: new Date(),
                status: 'ACTIVE',
                name: values['event_name'],
                description: values['event_description'],
                repeated: values['event_repeated'],
                duration: values['event_duration'],
                duration_time_unit: this.extractValueFromControl(values['event_duration_unit']),//[0]["text"],
                periodicity: this.extractValueFromControl(values['event_period']),//[0]["text"],
                start_date: moment(values['event_date_start'], 'YYYY-MM-DD').format('YYYY-MM-DD'),
                end_date: moment(values['event_date_end'], 'YYYY-MM-DD').format('YYYY-MM-DD'),
                start_time: values['event_time_start'],
                end_time: values['event_time_end'],
                venue: values['event_venue'],
                note: values['event_note'],
                date_month_from: +this.extractValueFromControl(values['event_date_mth_from']),//[0]["text"],
                date_month_to: +this.extractValueFromControl(values['event_date_mth_to']),//[0]["text"],
                month_to: this.extractValueFromControl(values['event_mth_to']),//[0]["text"],
                month_from: this.extractValueFromControl(values['event_mth_from']),//[0]["text"],
                event_category_id: event_catgory.id,
                parish_id: this._settingsService.parish_id
            })
            this._settingsService.saveEventDetail(regSt).subscribe(r => {
                this.showSuccess('Event saved successfully');
                this.getEvents();
            });

        }
    }

    public onCategorySubmit(values: Object): void {
        if (this.categoryFormGroup.valid) {
            this.loading = true;
            console.log(values);
            if (values['grp_name']['id'] > 0) {
                console.log("Event Category already exists, updating");
                //this.onGroupUpdateSubmit(values);
                return;
            }
            let grp = <EventCategory>{
                id: 0,
                created_at: new Date(),
                updated_at: new Date(),
                status: 'ACTIVE',
                parish_id: this._settingsService.parish_id,
                //date_created:values['grp_date_started'],
                name: values['grp_name'],
                description: values['grp_descrip']
            }
            console.log(grp);
            this._settingsService.saveEventCategory(grp).subscribe(r => {
                console.log(r);
                this.getEventsCategories();
                this.showSuccess('Event Category saved successfully');
            });
        }
    }

    onSelectEvent({ selected }) {
        console.log('Select Event', selected, this.selected);
        /*(<HTMLInputElement>document.getElementById("tr_name")).value = selected[0].name;
        (<HTMLInputElement>document.getElementById("tr_description")).value = selected[0].description;
        (<HTMLInputElement>document.getElementById("tr_repeated")).value = selected[0].repeated;
        (<HTMLInputElement>document.getElementById("tr_duration")).value = selected[0].duration;
        this.period_value = selected[0].duration_unit;
        (<HTMLSelectElement>document.getElementById("tr_duration_unit")).value = selected[0].duration_unit;
        (<HTMLSelectElement>document.getElementById("tr_period")).value = selected[0].period;
        (<HTMLInputElement>document.getElementById("tr_note")).value = selected[0].note;
        (<HTMLInputElement>document.getElementById("tr_name")).disabled = true;*/
    }


     autocompleListFormatterDescrip = (data: any): SafeHtml => {
        let html = `<span>${data.description}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    autocompleListFormatterName = (data: any): SafeHtml => {
        let html = `<span>${data.name}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }


}
