import {SettingsService} from '../../../_services/settings.service';
import {Component, ViewEncapsulation, ViewChild, ViewContainerRef} from '@angular/core';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import {FormBuilder, Validators, AbstractControl, FormGroup, FormControl} from '@angular/forms';
import { Training } from '../../../_models/utility';

@Component({
    moduleId: 'az-settings-events',
    selector: 'events',
    templateUrl: 'events.component.html',
    styleUrls: ['events.component.scss'],
    providers: [SettingsService]
})
export class EventsComponent {

    private trainings: Training[];

    public eventFormGroup : FormGroup;
    public event_name : AbstractControl;
    public event_description : AbstractControl;
    public event_repeated : AbstractControl;
    public event_duration : AbstractControl;
    public event_period : AbstractControl;
    public event_note : AbstractControl;
    public event_duration_unit : AbstractControl;

    loading = false;
    selected = [];
    
    constructor(private _settingsService : SettingsService, 
                public fb : FormBuilder, private _sanitizer : DomSanitizer) {
        
        
        //Initialize Group Form
        this.eventFormGroup = this.fb.group({
            'event_name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'event_description': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'event_repeated':[false],
            'event_duration': ['', Validators.compose([Validators.minLength(1)])],
            'event_duration_unit': ['', Validators.compose([Validators.minLength(3)])],
            'event_period': ['', Validators.compose([Validators.minLength(3)])],
            'event_note': ['', Validators.compose([Validators.minLength(3)])]
        });

        this.event_name = this.eventFormGroup.controls['event_name'];
        this.event_description = this.eventFormGroup.controls['event_description'];
        this.event_repeated = this.eventFormGroup.controls['event_repeated'];
        this.event_duration = this.eventFormGroup.controls['event_duration'];
        this.event_duration_unit = this.eventFormGroup.controls['event_duration_unit'];
        this.event_period = this.eventFormGroup.controls['event_period'];
        this.event_note = this.eventFormGroup.controls['event_note'];
    }
}
