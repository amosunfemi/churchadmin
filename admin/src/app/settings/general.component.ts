import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import * as _ from "lodash";
import { MomentModule } from 'angular2-moment/moment.module';
import * as moment from 'moment';
import { SettingsService } from '../_services/settings.service';
import { Country, Language, Parish, DefaultParameters, IDType, Titles, AgeGroup, RegionState, Currency } from '../_models/utility';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

@Component({
    templateUrl: 'general.component.html',
    providers: [SettingsService, ToasterService]
})
export class GeneralComponent {

    private toasterService: ToasterService;

    public toasterconfig: ToasterConfig =   
    new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
    });

    
    private params: any;
    
    settingsService: SettingsService;
    public countries: Country[];
    public currencies: Currency[];
    public currency: Currency;
    public idtypes: IDType[];
    public titles: Titles[];
    
    public regions: RegionState[];
    public languages: Language[];
    public agegroups: AgeGroup[];
    private showGrid: boolean;
    private rowData: any[];
    private columnDefs: any[];
    private defaultColDef: any[];
    private rowCount: string;
    private countrydata;
    private message: string;

    public defaults: DefaultParameters[];
    public defaultCtry: Country;
    public defaultLang: Language;
    public defaultReg: RegionState;
    public defaultCurr: Currency;


    public countryFormGroup: FormGroup;
    public country_id: AbstractControl;
    public language_id: AbstractControl;
    public currency_id: AbstractControl;

    public regionFormGroup: FormGroup;
    public region_name: AbstractControl;
    public region_descrip: AbstractControl;
    public region_city: AbstractControl;
    public region_default: AbstractControl;
    public region_isocode: AbstractControl;

    public idtypeFormGroup: FormGroup;
    public idtype_name: AbstractControl;
    public idtype_issueby: AbstractControl;
    public idtype_country: AbstractControl;
    public idtype_default: AbstractControl;
    public idtype_code: AbstractControl;

    public titleFormGroup: FormGroup;
    public title_code: AbstractControl;
    public title_name: AbstractControl;

    public agegroupFormGroup: FormGroup;
    public agegroup_code: AbstractControl;
    public agegroup_descrip: AbstractControl;
    public agegroup_minyr: AbstractControl;
    public agegroup_maxyr: AbstractControl;


    protected searchStr: string;


    loading = false;

    count: number = 50;
    rows: any[] = [];
    active: boolean = true;
    temp: any[] = [];
    cols: any = [
        'name', 'main_city_town', 'iso_code'
    ];

    selected = [];

    constructor(private _settingsService: SettingsService,
        public fb: FormBuilder, private _sanitizer: DomSanitizer, toasterService: ToasterService) {
        this.toasterService = toasterService;
        this.countryFormGroup = fb.group({
            'country_id': [
                '', Validators.compose([Validators.required, Validators.minLength(3)])
            ],
            'language_id': [
                '', Validators.compose([Validators.required, Validators.minLength(3)])
            ],
            'currency_id': [
                '', Validators.compose([Validators.required, Validators.minLength(2)])
            ]
        });

        //Initialize Region Form
        this.regionFormGroup = this.fb.group({
            'region_name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'region_descrip': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'region_city': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            'region_isocode': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'region_default': [false]
        });

        //Initialize IDType Form
        this.idtypeFormGroup = this.fb.group({
            'idtype_name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'idtype_issueby': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'idtype_country': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'idtype_code': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'idtype_default': [false]
        });

        //Initialize Title form
        this.titleFormGroup = fb.group({
            'title_code': [
                '', Validators.compose([Validators.required, Validators.minLength(2)])
            ],
            'title_name': [
                '', Validators.compose([Validators.required, Validators.minLength(3)])
            ]
        });


        //Initialize AgeGroup Form
        this.agegroupFormGroup = this.fb.group({
            'agegroup_code': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'agegroup_descrip': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'agegroup_minyr': [0, Validators.compose([Validators.required, Validators.minLength(1)])],
            'agegroup_maxyr': [0, Validators.compose([Validators.required, Validators.minLength(1)])]
        });

        

        //Initialize the forms controls
        this.country_id = this.countryFormGroup.controls['country_id'];
        this.language_id = this.countryFormGroup.controls['language_id'];
        this.currency_id = this.countryFormGroup.controls['currency_id'];


        this.region_name = this.regionFormGroup.controls['region_name'];
        this.region_descrip = this.regionFormGroup.controls['region_descrip'];
        this.region_city = this.regionFormGroup.controls['region_city'];
        this.region_default = this.regionFormGroup.controls['region_default'];
        this.region_isocode = this.regionFormGroup.controls['region_isocode'];

        this.idtype_name = this.idtypeFormGroup.controls['idtype_name'];
        this.idtype_issueby = this.idtypeFormGroup.controls['idtype_issueby'];
        this.idtype_country = this.idtypeFormGroup.controls['idtype_country'];
        this.idtype_default = this.idtypeFormGroup.controls['idtype_default'];
        this.idtype_code = this.idtypeFormGroup.controls['idtype_code'];

        this.title_code = this.titleFormGroup.controls['title_code'];
        this.title_name = this.titleFormGroup.controls['title_name'];

        this.agegroup_code = this.agegroupFormGroup.controls['agegroup_code'];
        this.agegroup_descrip = this.agegroupFormGroup.controls['agegroup_descrip'];
        this.agegroup_minyr = this.agegroupFormGroup.controls['agegroup_minyr'];
        this.agegroup_maxyr = this.agegroupFormGroup.controls['agegroup_maxyr'];
    }

    ngOnInit() {
        this.getAllLanguages();
        this.getAllCountries();
        this.getDefaults();
        this.getAllIDTypes();
        this.getAgeGroups();
        this.getAllCurrencies()
        
    }

    private getAllCountries() {
        this._settingsService.getCountries().subscribe(p => {
            this.countries = p;
        });
    }
    private getAllCurrencies() {
        this._settingsService.getAllCurrencies().subscribe(p => {
            this.currencies = p;
        });
    }
    private getAllIDTypes() {
        this._settingsService.getIDTypes().subscribe(p => {
            this.idtypes = p;
            //console.log(this.idtypes);
        });
    }

    private getCountryRegions(ctry_id: number) {
        this._settingsService.getRegionStateByCountryID(ctry_id).subscribe(reg => {
            this.regions = reg;
        })
    }

    private getTitleByLanguage(lang_id: number) {
        this._settingsService.getAllTitleByLanguage(lang_id).subscribe(title => {
            this.titles = title;
            //console.log(this.titles);
        })
    }

    private getNameByLanguage(lang_id: number) {
        this._settingsService.getAllTitleByLanguage(lang_id).subscribe(title => {
            this.titles = title;
            //console.log(this.titles);
        })
    }

    private getNameByCurrCode(curr_id: number) {
        this._settingsService.getCurrencyByID(curr_id).subscribe(curr => {
            this.currency = curr;
            //console.log(this.titles);
        })
    }

    private getDefaults() {
        this._settingsService.getDefaults().subscribe(p => {
            this.defaults = p;
            let ctrydef = _.filter(this.defaults, { entity: "country" });
            let langdef = _.filter(this.defaults, { entity: "language" });
            let regdef = _.filter(this.defaults, { entity: "regionstate" });
            let currdef = _.filter(this.defaults, { entity: "currency" });

            this._settingsService.getCountryByID(ctrydef[0]["entity_id"]).subscribe(p => {
                this.defaultCtry = p;
                this.getCountryRegions(this.defaultCtry.id);
                (<HTMLInputElement>document.getElementById("country_id")).value = this.defaultCtry.name;
            });
            this._settingsService.getLanguageByID(langdef[0]["entity_id"]).subscribe(p => {
                this.defaultLang = p;
                this.getTitleByLanguage(langdef[0]["entity_id"]);
                (<HTMLInputElement>document.getElementById("language_id")).value = this.defaultLang.name;
            });
            this._settingsService.getCurrencyByID(currdef[0]["entity_id"]).subscribe(p => {
                this.defaultCurr = p;
                this.getNameByCurrCode(currdef[0]["entity_id"]);
                (<HTMLInputElement>document.getElementById("currency_id")).value = this.defaultCurr.name;
            });

            
            this._settingsService.getRegionStateByID(regdef[0]["entity_id"]).subscribe(p => {
                this.defaultReg = p;
                (<HTMLInputElement>document.getElementById("region_name")).value = this.defaultReg.name;
                (<HTMLInputElement>document.getElementById("region_descrip")).value = this.defaultReg.description;
                (<HTMLInputElement>document.getElementById("region_city")).value = this.defaultReg.main_city_town;
                (<HTMLInputElement>document.getElementById("region_isocode")).value = this.defaultReg.iso_code;
                (<HTMLInputElement>document.getElementById("region_isocode")).disabled = true;
            });


        });
    }

    //Get all languages
    private getAllLanguages() {
        this._settingsService.getLanguages().subscribe(p => {
            this.languages = p;
        });
    }
    private getAgeGroups() {
        this._settingsService.getAgeGroups().subscribe(p => {
            this.agegroups = p;
        });
    }
    private returnRows() {
        return this._settingsService.getLanguages();
    }


    public onCountryLangSubmit(values: Object): void {
        if (this.countryFormGroup.valid) {
            this.loading = true;

            let paramCtry = <DefaultParameters>({
                parameter: 'default',
                entity: 'country',
                entity_id: values['country_id']['id']
            });
            let paramLang = <DefaultParameters>({
                parameter: 'default',
                entity: 'language',
                entity_id: values['language_id']['id']
            });

            let paramCurr = <DefaultParameters>({
                parameter: 'default',
                entity: 'currency',
                entity_id: values['currency_id']['id']
            });

            this._settingsService.saveDefaultParameters(paramCtry).subscribe(dfctry => {
                console.log(dfctry);
                this.showSuccess('Default Country saved successfully');
            });

            this._settingsService.saveDefaultParameters(paramLang).subscribe(dfctry => {
                console.log(dfctry);
                this.showSuccess('Default Language saved successfully');
            });
            this._settingsService.saveDefaultParameters(paramCurr).subscribe(dfctry => {
                console.log(dfctry);
                this.showSuccess('Default Currency saved successfully');
            });
        }
    }
    public onRegionSubmit(values: Object): void {
        if (this.regionFormGroup.valid) {
            this.loading = true;
            if (values['region_name']['id'] > 0) {
                console.log("Region Already Exist. Updating");
                this.onRegionUpdateSubmit(values);
                return;
            }
            let regSt = <RegionState>({
                id: 0,
                created_at: new Date(),
                updated_at: new Date(),
                status: 'ACTIVE',
                name: values['region_name'],
                iso_code: values['region_isocode'],
                description: values['region_descrip'],
                main_city_town: values['region_city'],
                country_id: this.defaultCtry.id
            })
            this._settingsService.saveRegionState(regSt).subscribe(r => {
                this.getCountryRegions(this.defaultCtry.id);
                this.showSuccess('Region saved successfully');
                if (values["region_default"]) {
                    let paramReg = <DefaultParameters>({
                        parameter: 'default',
                        entity: 'regionstate',
                        entity_id: r['id']
                    });
                    this._settingsService.saveDefaultParameters(paramReg).subscribe(dfreg => {
                        this.showSuccess('Default Region saved successfully');
                    });
                }

            });

        }
    }

    public onRegionUpdateSubmit(values: Object): void {
        if (this.regionFormGroup.valid) {
            this.loading = true;

            if (_.isObject(values['region_descrip'])) {
                values['region_name']['description'] = values['region_descrip']['description']
            } else {
                values['region_name']['description'] = values['region_descrip']
            }
            if (_.isObject(values['region_isocode'])) {
                values['region_name']['iso_code'] = values['region_isocode']['iso_code']
            } else {
                values['region_name']['iso_code'] = values['region_isocode']
            }
            if (_.isObject(values['region_city'])) {
                values['region_name']['main_city_town'] = values['region_isocode']['main_city_town']
            } else {
                values['region_name']['main_city_town'] = values['region_city']
            }

            this._settingsService.updateRegionState(values['region_name']).subscribe(r => {
                if (values["region_default"]) {
                    let paramReg = <DefaultParameters>({
                        parameter: 'default',
                        entity: 'regionstate',
                        entity_id: r['id']
                    });
                    this.showInfo('Region updated successfully');
                    this._settingsService.saveDefaultParameters(paramReg).subscribe(dfreg => {
                        console.log(dfreg);
                    });
                }
            });
        }
    }
    public onIDTypeUpdateSubmit(values: Object): void {
        if (this.idtypeFormGroup.valid) {
            this.loading = true;

            if (_.isObject(values['idtype_name'])) {
                values['idtype_code']['idtype_name'] = values['idtype_name']['name']
            } else {
                values['idtype_code']['name'] = values['name']
            }
            if (_.isObject(values['idtype_country'])) {
                values['idtype_code']['country_id'] = values['idtype_country']['id']
            } else {
                values['idtype_code']['country_id'] = values['idtype_country']['id']
            }
            if (_.isObject(values['idtype_issueby'])) {
                values['idtype_code']['issued_by'] = values['idtype_issueby']['issued_by']
            } else {
                values['idtype_code']['issued_by'] = values['idtype_issueby']
            }

            this._settingsService.updateIDType(values['idtype_code']).subscribe(r => {
                this.showInfo('ID updated successfully');
                console.log(r);
            });
        }
    }

    public onIDTypeSubmit(values: Object): void {
        if (this.idtypeFormGroup.valid) {
            this.loading = true;
            console.log(values);
            if (values['idtype_code']['id'] > 0) {
                console.log("IDType already exists, updating");
                this.onIDTypeUpdateSubmit(values);
                return;
            }

            let idtype = <IDType>{
                id: 0,
                created_at: new Date(),
                updated_at: new Date(),
                status: 'ACTIVE',
                code: values['idtype_code'],
                name: values['idtype_name'],
                country_id: values['idtype_country']['id'],
                issued_by: values['idtype_issueby']
            }
            this._settingsService.saveIDType(idtype).subscribe(r => {
                this.showSuccess('ID updated successfully');
                this.getAllIDTypes();
                //console.log(r);

            });
        }
    }

    public onTitleUpdateSubmit(values: Object): void {
        if (this.titleFormGroup.valid) {
            this.loading = true;

            if (_.isObject(values['title_code'])) {
                values['title_code']['code'] = values['title_code']['code']
            } else {
                values['title_code']['code'] = values['title_code']
            }
            if (_.isObject(values['title_name'])) {
                values['title_code']['name'] = values['title_name']['name']
            } else {
                values['title_code']['name'] = values['title_name']
            }

            this._settingsService.updateTitle(values['title_code']).subscribe(r => {
                this.showInfo('Title updated successfully');
                console.log(r);
            });
        }
    }

    public onTitleSubmit(values: Object): void {
        if (this.titleFormGroup.valid) {
            this.loading = true;
            console.log(values);
            if (values['title_code']['id'] > 0) {
                console.log("Title already exists, updating");
                this.onTitleUpdateSubmit(values);
                return;
            }
            let title = <Titles>{
                id: 0,
                created_at: new Date(),
                updated_at: new Date(),
                status: 'ACTIVE',
                code: values['title_code'],
                name: values['title_name'],
                language_id: this.defaultLang.id
            }
            console.log(title);
            this._settingsService.saveTitle(title).subscribe(r => {
                this.getTitleByLanguage(this.defaultLang.id);
                this.showSuccess('Title saved successfully');
                console.log(r);

            });
        }
    }

    public onAgeGroupUpdateSubmit(values: Object): void {

    }

    public onAgeGroupSubmit(values: Object): void {
        if (this.agegroupFormGroup.valid) {
            this.loading = true;
            console.log(values);
            if (values['agegroup_code']['id'] > 0) {
                console.log("AgeGroup already exists, updating");
                this.onAgeGroupUpdateSubmit(values);
                return;
            }
            let agegrp = <AgeGroup>{
                id: 0,
                created_at: new Date(),
                updated_at: new Date(),
                status: 'ACTIVE',
                code: values['agegroup_code'],
                description: values['agegroup_descrip'],
                min_age: parseInt(values['agegroup_minyr']),
                max_age: parseInt(values['agegroup_maxyr'])
            }
            console.log(agegrp);
            this._settingsService.saveAgeGroup(agegrp).subscribe(r => {
                this.showSuccess('Age saved successfully');
                console.log(r);
            });
        }
    }



    autocompleListFormatter = (data: any): SafeHtml => {
        let html = `<span>${data.name}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    autocompleListFormatterFullName = (data: any): SafeHtml => {
        let html = `<span>${data.full_name}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }
    autocompleListFormatterDescrip = (data: any): SafeHtml => {
        let html = `<span>${data.description}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    autocompleListFormatterMainCity = (data: any): SafeHtml => {
        let html = `<span>${data.main_city_town}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }
    autocompleListFormatterIsoCode = (data: any): SafeHtml => {
        let html = `<span>${data.iso_code}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }
    autocompleListFormatterCode = (data: any): SafeHtml => {
        let html = `<span>${data.code}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    autocompleListFormatterIssuedBy = (data: any): SafeHtml => {
        let html = `<span>${data.issued_by}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
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

    onSelectRegion({ selected }) {
        console.log('Select Event', selected, this.selected);
        (<HTMLInputElement>document.getElementById("region_name")).value = selected[0].name;
        (<HTMLInputElement>document.getElementById("region_descrip")).value = selected[0].description;
        (<HTMLInputElement>document.getElementById("region_city")).value = selected[0].main_city_town;
        (<HTMLInputElement>document.getElementById("region_isocode")).value = selected[0].iso_code;
        (<HTMLInputElement>document.getElementById("region_isocode")).disabled = true;
    }

    onSelectId({ selected }) {
        console.log('Select Event', selected, this.selected);
        (<HTMLInputElement>document.getElementById("idtype_code")).value = selected[0].code;
        (<HTMLInputElement>document.getElementById("idtype_name")).value = selected[0].name;
        (<HTMLInputElement>document.getElementById("idtype_issueby")).value = selected[0].issued_by;
        
        
        (<HTMLInputElement>document.getElementById("idtype_code")).disabled = true;
        let ctry = this.countries.filter(function(d){
            return d.id == selected[0].country_id;
        });

        (<HTMLInputElement>document.getElementById("idtype_country")).value = ctry[0].name;
    }

    onSelectTitle({ selected }) {
        console.log('Select Event', selected, this.selected);
        (<HTMLInputElement>document.getElementById("title_code")).value = selected[0].code;
        (<HTMLInputElement>document.getElementById("title_name")).value = selected[0].name;
        (<HTMLInputElement>document.getElementById("title_code")).disabled = true;
    }

    onSelectAgeGroup({ selected }) {
        console.log('Select Event', selected, this.selected);
        (<HTMLInputElement>document.getElementById("agegroup_code")).value = selected[0].code;
        (<HTMLInputElement>document.getElementById("agegroup_descrip")).value = selected[0].description;
        (<HTMLInputElement>document.getElementById("agegroup_minyr")).value = selected[0].min_age;
        (<HTMLInputElement>document.getElementById("agegroup_maxyr")).value = selected[0].max_age;
        (<HTMLInputElement>document.getElementById("agegroup_code")).disabled = true;
    }

    getSelectedIx() {
        return this.selected[0]['$$index'];
    }

    onActivate(event) {
        console.log('Activate Event', event);
    }
}
