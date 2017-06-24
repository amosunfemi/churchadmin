import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {DataTablesModule} from 'angular-datatables';
import {BrowserModule} from '@angular/platform-browser';
import {GridOptions} from "ag-grid";
import {RedComponentComponent} from "./red-component.component";
import {ParishService} from '../../../_services/parish.service';
import {Parish} from '../../../_models/utility';
import { CompleterService, CompleterData } from 'ng2-completer';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormBuilder, Validators, AbstractControl, FormGroup, FormControl } from '@angular/forms';


import * as _ from "lodash";
import { MomentModule } from 'angular2-moment/moment.module';
import * as moment from 'moment';

@Component({selector: 'az-parish', encapsulation: ViewEncapsulation.None, templateUrl: './parish.component.html', styleUrls: ['./parish.component.scss'], providers: [ParishService]})
export class ParishComponent implements OnInit {
    private params : any;
    private gridOptions : GridOptions;
    parishService : ParishService
    public parishes : Array < Parish >;
    private showGrid : boolean;
    private rowData : any[];
    private columnDefs : any[];
    private defaultColDef:any[];
    private rowCount : string;
    private parishdata;
    public name : AbstractControl;
    public fullname : AbstractControl;
    public parent_id : AbstractControl;
    public form : FormGroup;
    protected dataService: CompleterData;
    protected searchStr: string;
    
    public loginForm = this.fb.group({
        name: ["", Validators.required],
        fullname: ["", Validators.required],
        parent_id: [""]
    });
    
    private dataSource = {
        paginationPageSize: 10,
        overflowSize: 100,
        getRows: (params : any) => {
            this
                .returnRows()
                .subscribe(data => {
                    var rowsThisPage = data.slice(params.startRow, params.endRow);
                    var lastRow = -1;
                    params.successCallback(rowsThisPage, lastRow);

                });
        }
    } 
    constructor(private _parishService : ParishService, public fb: FormBuilder, private completerService: CompleterService, private _sanitizer: DomSanitizer) {
        this.form = fb.group({
            'parent_id': [
                '', Validators.compose([Validators.minLength(3)])
            ],
            'name': [
                '', Validators.compose([Validators.required, Validators.minLength(3)])
            ],
            'fullname': [
                '', Validators.compose([
                    Validators.required, Validators.minLength(6)
                ])
            ]
        });
        
        this.name = this.form.controls['name'];
        this.fullname = this.form.controls['fullname'];
        this.parent_id = this.form.controls['parent_id'];
        
    }

    ngOnInit() {
        this.getAllParishes();
        this.columnDefs = [
            {
                headerName: "ID",
                field: "id",
                hide: true
            },
            {
                headerName: "Full Name",
                field: "full_name",
                filter: 'text'
            }, {
                headerName: "Name",
                field: "name"
            }, {
                headerName: "Date Created",
                field: "created_at",
                cellFormatter: function (data) {
                    return moment(data.value).format('LL');
                }
            }
        ];
        this.defaultColDef = [{
            // make every column editable
            editable: true,
            // make every column use 'text' filter by default
            filter: 'text'
        }];
        
        this.gridOptions = <GridOptions>{};
       
        this.gridOptions.datasource = this.dataSource;
        this.gridOptions.enableFilter = true;
        this.parishdata = this.returnRows();
    }

    private returnRows(){
        return this._parishService.getAllParishes();
    }
    private getAllParishes(){
        this._parishService.getAllParishes().subscribe(p => {
            this.parishes = p;
            console.log(this.parishes);
        });
    }

    onRowClicked(event: any) { console.log('row', event); }
    onCellClicked(event: any) { console.log('cell', event); }
    onSelectionChanged(event: any) { console.log("selection", event); }
    rowDoubleClicked(event: any){
        console.log("select", event)
    }
    
    autocompleListFormatter = (data: any) : SafeHtml => {
        let html = `<span>${data.name}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    autocompleListFormatterFullName = (data: any) : SafeHtml => {
        let html = `<span>${data.full_name}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }
        

}
export function emailValidator(control : FormControl) : {
    [key : string]: any
}
{
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return {invalidEmail: true};
    }
}
