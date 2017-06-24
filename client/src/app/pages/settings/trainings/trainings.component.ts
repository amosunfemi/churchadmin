import {Component, ViewEncapsulation, ViewChild, ViewContainerRef} from '@angular/core';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import {FormBuilder, Validators, AbstractControl, FormGroup, FormControl} from '@angular/forms';
import {SettingsService} from '../../../_services/settings.service';
import { Training } from '../../../_models/utility';

@Component({
    moduleId: 'az-settings-trainings',
    selector: 'trainings',
    templateUrl: 'trainings.component.html',
    styleUrls: ['trainings.component.scss'], 
    providers: [SettingsService]
})
export class TrainingsComponent {

    private trainings: Training[];

    public trainingFormGroup : FormGroup;
    public tr_name : AbstractControl;
    public tr_description : AbstractControl;
    public tr_repeated : AbstractControl;
    public tr_duration : AbstractControl;
    public tr_period : AbstractControl;
    public tr_note : AbstractControl;
    public tr_duration_unit : AbstractControl;

    loading = false;
    selected = [];

    constructor(private _settingsService : SettingsService, 
                public fb : FormBuilder, private _sanitizer : DomSanitizer) {
        
        
        //Initialize Group Form
        this.trainingFormGroup = this.fb.group({
            'tr_name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'tr_description': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'tr_repeated':[false],
            'tr_duration': ['', Validators.compose([Validators.minLength(1)])],
            'tr_duration_unit': ['', Validators.compose([Validators.minLength(3)])],
            'tr_period': ['', Validators.compose([Validators.minLength(3)])],
            'tr_note': ['', Validators.compose([Validators.minLength(3)])]
        });

        this.tr_name = this.trainingFormGroup.controls['tr_name'];
        this.tr_description = this.trainingFormGroup.controls['tr_description'];
        this.tr_repeated = this.trainingFormGroup.controls['tr_repeated'];
        this.tr_duration = this.trainingFormGroup.controls['tr_duration'];
        this.tr_duration_unit = this.trainingFormGroup.controls['tr_duration_unit'];
        this.tr_period = this.trainingFormGroup.controls['tr_period'];
        this.tr_note = this.trainingFormGroup.controls['tr_note'];
    }

    ngOnInit() {
        this.getTrainings();
    }

    private getTrainings(){
        this._settingsService.getTrainings().subscribe(p => {
            this.trainings = p;
        }); 
    }

    public onTrainingUpdateSubmit(values : Object) : void {

    }

    public onTrainingSubmit(values: Object) : void {
        if(this.trainingFormGroup.valid){
            this.loading = true;
            console.log(values);
            if(values['tr_name']['id'] > 0){
                console.log("Training already exists, updating");
                this.onTrainingUpdateSubmit(values);
                return;
            }
            let trg = <Training> {
                id: 0,
                created_at: new Date(),
                updated_at: new Date(),
                status:'ACTIVE',
                parish_id: this._settingsService.parish_id,
                name: values['tr_name'],
                description: values['tr_description'],
                repeated : values['tr_repeated'],
                duration : values['tr_duration'],
                duration_unit: values['tr_duration_unit'],
                period: values['tr_period'],
                note: values['tr_note']
            }
            console.log(trg);
            this._settingsService.saveTraining(trg).subscribe(r => {
                console.log(r);
                this.getTrainings();
            });
        }
    }
}


