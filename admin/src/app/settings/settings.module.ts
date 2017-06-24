import { NgModule } from '@angular/core';



import { SettingsRoutingModule } from './settings-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { GeneralComponent } from './general.component';
import { EventComponent } from './event.component';
import { DepartmentComponent } from './department.component';
import { GroupComponent } from './group.component';
import { ParishesComponent } from './parishes.component';
import { RolesComponent } from './roles.component';
import { TrainingComponent } from './training.component';
import { UserComponent } from './user.component';
import { CommunicationComponent } from './communication.component';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';
import { SelectModule } from 'ng2-select';
import { TimepickerModule } from 'ng2-bootstrap/timepicker';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap';
import {TooltipModule} from "ngx-tooltip";



@NgModule({
    imports: [SettingsRoutingModule, FormsModule,
        ReactiveFormsModule, CommonModule, NguiAutoCompleteModule, NgxDatatableModule,
        ToasterModule, SelectModule, TimepickerModule.forRoot(),
        DatepickerModule.forRoot(),TabsModule.forRoot(), TooltipModule],
    declarations: [
        GeneralComponent,
        EventComponent,
        DepartmentComponent,
        GroupComponent,
        ParishesComponent,
        RolesComponent,
        TrainingComponent,
        UserComponent,
        CommunicationComponent
    ]
})
export class SettingsModule { }
