import { NgModule } from '@angular/core';



import { PeopleRoutingModule } from './people-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MemberComponent } from './member/member.component';
import { FamilyComponent } from './family/family.component';
import { VisitorComponent } from './visitor/visitor.component';

import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';
import { SelectModule } from 'ng2-select';
import { TimepickerModule } from 'ng2-bootstrap/timepicker';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap';
import {TooltipModule} from "ngx-tooltip";



@NgModule({
    imports: [PeopleRoutingModule, FormsModule,
        ReactiveFormsModule, CommonModule, NguiAutoCompleteModule, NgxDatatableModule,
        ToasterModule, SelectModule, TimepickerModule.forRoot(),
        DatepickerModule.forRoot(),TabsModule.forRoot(), TooltipModule],
    declarations: [
        MemberComponent,
        FamilyComponent,
        VisitorComponent
    ]
})
export class PeopleModule { }
