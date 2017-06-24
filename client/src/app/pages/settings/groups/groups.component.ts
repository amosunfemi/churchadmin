
import { RegionState } from '../../../_models';
import {Component, ViewEncapsulation, ViewChild, ViewContainerRef} from '@angular/core';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import {FormBuilder, Validators, AbstractControl, FormGroup, FormControl} from '@angular/forms';

import {DataTablesModule} from 'angular-datatables';
import {BrowserModule} from '@angular/platform-browser';
import {GridOptions} from "ag-grid";
import { Country, Language, Parish, DefaultParameters, IDType, Titles, AgeGroup, Group, Department } from '../../../_models/utility';
import { Select2OptionData } from 'ng2-select2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';


import * as _ from "lodash";
import {MomentModule} from 'angular2-moment/moment.module';
import * as moment from 'moment';
import {SettingsService} from '../../../_services/settings.service';
import { NguiPopupComponent, NguiMessagePopupComponent } from '@ngui/popup';
import { ModalService } from '../../../_services/index';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Overlay } from 'angular2-modal';

@Component({
    moduleId: 'az-groups',
    selector: 'groups',
    templateUrl: 'groups.component.html',
    styleUrls: ['groups.component.scss'], 
    providers: [SettingsService, ModalService]
})
export class GroupsComponent {

    private groups: Group[];
    private departments: Department[];
    loading = false;
    selected = [];


    public groupFormGroup : FormGroup;
    public grp_name : AbstractControl;
    public grp_descrip : AbstractControl;
    public grp_date_started: AbstractControl;

    public deptFormGroup : FormGroup;
    public dept_name : AbstractControl;
    public dept_description : AbstractControl;
    public dept_date_started: AbstractControl;
    
    constructor(private modalService: ModalService, private _settingsService : SettingsService, 
                public fb : FormBuilder, private _sanitizer : DomSanitizer,
                overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
        overlay.defaultViewContainer = vcRef;
        
        //Initialize Group Form
        this.groupFormGroup = this.fb.group({
            'grp_name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'grp_descrip': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'grp_date_started':['']
        });

        //Initialize Department Form
        this.deptFormGroup = this.fb.group({
            'dept_name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'dept_description': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'dept_date_started':['']
        });

        
        this.grp_name = this.groupFormGroup.controls['grp_name'];
        this.grp_descrip = this.groupFormGroup.controls['grp_descrip'];
        this.grp_date_started = this.groupFormGroup.controls['grp_date_started'];

        this.dept_name = this.deptFormGroup.controls['dept_name'];
        this.dept_description = this.deptFormGroup.controls['dept_description'];
        this.dept_date_started = this.deptFormGroup.controls['dept_date_started'];
        
    }

    ngOnInit() {
        this.getGroups();
        this.getDepartments();
        
    }

    private getGroups(){
        this._settingsService.getGroups().subscribe(p => {
            this.groups = p;
        }); 
    }

    private getDepartments(){
        this._settingsService.getDepartment().subscribe(p => {
            this.departments = p;
        }); 
    }

    public onGroupUpdateSubmit(values:Object): void {
        if(this.groupFormGroup.valid){
            this.loading = true;
            if (_.isObject(values['grp_name'])){
                values['grp_name']['name'] = values['grp_name']['name']
            }else{
                values['grp_name']['name'] = values['grp_name']
            }
            if (_.isObject(values['grp_descrip'])){
                values['grp_name']['description'] = values['grp_descrip']['description']
            }else{
                values['grp_name']['description'] = values['grp_descrip']
            }
            this._settingsService.updateGroup(values['grp_name']).subscribe(r => {
                console.log(r);
            });
        }
    }

    public onGroupSubmit(values:Object) : void{
        if(this.groupFormGroup.valid){
            this.loading = true;
            console.log(values);
            if(values['grp_name']['id'] > 0){
                console.log("Group already exists, updating");
                this.onGroupUpdateSubmit(values);
                return;
            }
            let grp = <Group> {
                id: 0,
                created_at: new Date(),
                updated_at: new Date(),
                status:'ACTIVE',
                parish_id: this._settingsService.parish_id,
                //date_created:values['grp_date_started'],
                name: values['grp_name'],
                description: values['grp_descrip']
            }
            console.log(grp);
            this._settingsService.saveGroup(grp).subscribe(r => {
                console.log(r);
                this.getGroups();
            });
        }
    }

    public onDeptUpdateSubmit(values:Object): void {
        if(this.deptFormGroup.valid){
            this.loading = true;
            
            if (_.isObject(values['dept_name'])){
                values['dept_name']['name'] = values['dept_name']['name']
            }else{
                values['dept_name']['name'] = values['dept_name']
            }
            if (_.isObject(values['dept_description'])){
                values['dept_name']['description'] = values['dept_description']['description']
            }else{
                values['dept_name']['description'] = values['dept_description']
            }
            this._settingsService.updateDepartment(values['dept_name']).subscribe(r => {
                console.log(r);
            });
        }
    }

    public onDeptSubmit(values:Object) : void{
        if(this.deptFormGroup.valid){
            this.loading = true;
            console.log(values);
            if(values['dept_name']['id'] > 0){
                console.log("Department already exists, updating");
                this.onDeptUpdateSubmit(values);
                return;
            }
            let dept = <Department> {
                id: 0,
                created_at: new Date(),
                updated_at: new Date(),
                status:'ACTIVE',
                parish_id: this._settingsService.parish_id,
                //date_created:values['dept_date_started'],
                name: values['dept_name'],
                description: values['dept_description']
            }
            console.log(dept);
            this._settingsService.saveDepartment(dept).subscribe(r => {
                console.log(r);
                this.getDepartments();
            });
        }
    }

    public onGroupDelete(values:Object) : void {

    }

    onSelectGroupTable({ selected }) {
        console.log('Select Event', selected, this.selected);
    }
    
    getSelectedIx() {
        return this.selected[0]['$$index'];
    }

    onActivate(event) {
        console.log('Activate Event', event);
    }

    updateRowPosition() {
        const ix = this.getSelectedIx();
        const arr = [ ...this.groups ];
        arr[ix - 1] = this.groups[ix];
        arr[ix] = this.groups[ix - 1];
        console.log(arr);
        this.groups = arr;
    }


    autocompleListFormatterDescrip = (data: any) : SafeHtml => {
        let html = `<span>${data.description}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    autocompleListFormatterName = (data: any) : SafeHtml => {
        let html = `<span>${data.name}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    
}
