import { Component, ViewEncapsulation, ViewChild, ViewContainerRef, ViewChildren } from '@angular/core';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { FormBuilder, Validators, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { SettingsService } from '../_services/settings.service';
import { Training } from '../_models/utility';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import {SelectComponent} from 'ng2-select';

@Component({
    moduleId: 'az-settings-trainings',
    selector: 'trainings',
    templateUrl: 'training.component.html',
    providers: [SettingsService, ToasterService]
})
export class TrainingComponent {
    private toasterService: ToasterService;
    private trainings: Training[];
    private period_value: any = ['WEEKLY'];
    private duration_value: any = ['HOURS'];

    public trainingFormGroup: FormGroup;
    public tr_name: AbstractControl;
    public tr_description: AbstractControl;
    public tr_repeated: AbstractControl;
    public tr_duration: AbstractControl;
    public tr_period: AbstractControl;
    public tr_note: AbstractControl;
    public tr_duration_unit: AbstractControl;

    public wkDays: Array<string> = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    public durUnit: Array<string> = ['MINUTES', 'HOURS', 'DAYS', 'WEEKS', 'MONTH', 'YEARS'];
    public period: Array<string> = ['DAILY', 'WEEKLY', 'BI-WEEKLY', 'FORTNIGHT', 'MONTHLY', 'QUATERLY','SEMI-YEALY', 'YEARLY'];

    loading = false;
    selected = [];

    @ViewChild(SelectComponent) select: SelectComponent;


    constructor(private _settingsService: SettingsService,
        public fb: FormBuilder, private _sanitizer: DomSanitizer) {


        //Initialize Group Form
        this.trainingFormGroup = this.fb.group({
            'tr_name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'tr_description': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'tr_repeated': [false],
            'tr_duration': ['', Validators.compose([Validators.minLength(1)])],
            //'tr_duration_unit': ['', Validators.compose([Validators.minLength(20)])],
            //'tr_period': ['', Validators.compose([Validators.minLength(20)])],
            'tr_note': ['', Validators.compose([Validators.minLength(3)])]
        });

        this.tr_name = this.trainingFormGroup.controls['tr_name'];
        this.tr_description = this.trainingFormGroup.controls['tr_description'];
        this.tr_repeated = this.trainingFormGroup.controls['tr_repeated'];
        this.tr_duration = this.trainingFormGroup.controls['tr_duration'];
        
        this.tr_note = this.trainingFormGroup.controls['tr_note'];
    }

    ngOnInit() {
        this.getTrainings();
    }

    private getTrainings() {
        this._settingsService.getTrainings().subscribe(p => {
            this.trainings = p;
        });
    }

    public onTrainingUpdateSubmit(values: Object): void {

    }

    public onTrainingSubmit(values: Object): void {
        if (this.trainingFormGroup.valid) {
            this.loading = true;
            console.log(values);
            if (values['tr_name']['id'] > 0) {
                console.log("Training already exists, updating");
                this.onTrainingUpdateSubmit(values);
                return;
            }
            let trg = <Training>{
                id: 0,
                created_at: new Date(),
                updated_at: new Date(),
                status: 'ACTIVE',
                parish_id: this._settingsService.parish_id,
                name: values['tr_name'],
                description: values['tr_description'],
                repeated: values['tr_repeated'],
                duration: values['tr_duration'],
                duration_unit: this.duration_value.text,//values['tr_duration_unit'],
                period: this.period_value.text,//values['tr_period'],
                note: values['tr_note']
            }
            console.log(trg);
            this._settingsService.saveTraining(trg).subscribe(r => {
                this.showSuccess('Training saved successfully');
                this.getTrainings();
            });
        }
    }

    onSelectTraining({ selected }) {
        console.log('Select Event', selected, this.selected);
        (<HTMLInputElement>document.getElementById("tr_name")).value = selected[0].name;
        (<HTMLInputElement>document.getElementById("tr_description")).value = selected[0].description;
        (<HTMLInputElement>document.getElementById("tr_repeated")).value = selected[0].repeated;
        (<HTMLInputElement>document.getElementById("tr_duration")).value = selected[0].duration;
        this.period_value = selected[0].duration_unit;
        (<HTMLSelectElement>document.getElementById("tr_duration_unit")).value = selected[0].duration_unit;
        (<HTMLSelectElement>document.getElementById("tr_period")).value = selected[0].period;
        (<HTMLInputElement>document.getElementById("tr_note")).value = selected[0].note;
        (<HTMLInputElement>document.getElementById("tr_name")).disabled = true;
    }

    onActivate(event) {
        console.log('Activate Event', event);
    }

    public refreshValue(value: any): void {
        this.period_value = value;
    }

    public period_selected(value: any): void {
        console.log('Selected value is: ', value);
    }

    public refreshDurationValue(value: any): void {
        this.duration_value = value;
    }

    public duration_selected(value: any): void {
        console.log('Selected value is: ', value);
    }

    showSuccess(msg: string) {
        this.toasterService.pop('success', 'Ijosin: General', msg);
    }

    showError(msg: string) {
        this.toasterService.pop('error', 'Ijosin: General', msg);
    }

    showWarning(msg: string) {
        this.toasterService.pop('warning', 'Ijosin: General', msg);
    }

    showInfo(msg: string) {
        this.toasterService.pop('info', 'Ijosin: General', msg);
    }

    showPrimary(msg: string) {
        this.toasterService.pop('primary', 'Ijosin: General', msg);
    }
}


