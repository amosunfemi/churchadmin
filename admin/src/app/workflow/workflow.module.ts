import { NgModule } from '@angular/core';



import { WorkflowRoutingModule } from './workflow-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TaskComponent } from './task/task.component';
import { MessagesComponent } from './messages/messages.component';
import { NotificationsComponent } from './notifications/notifications.component';

import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';
import { SelectModule } from 'ng2-select';
import { TimepickerModule } from 'ng2-bootstrap/timepicker';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap';
import {TooltipModule} from "ngx-tooltip";



@NgModule({
    imports: [WorkflowRoutingModule, FormsModule,
        ReactiveFormsModule, CommonModule, NguiAutoCompleteModule, NgxDatatableModule,
        ToasterModule, SelectModule, TimepickerModule.forRoot(),
        DatepickerModule.forRoot(),TabsModule.forRoot(), TooltipModule],
    declarations: [
        TaskComponent,
        MessagesComponent,
        NotificationsComponent
    ]
})
export class WorkflowModule { }
