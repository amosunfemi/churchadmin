// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ParishComponent } from './parish/parish.component';
import { GeneralComponent } from './general/general.component';
import { GroupsComponent } from './groups/groups.component';
import { RedComponentComponent } from './parish/red-component.component';
import {AgGridModule} from "ag-grid-angular/main";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopoverModule } from 'ng2-pop-over';
import {FormlyModule, FormlyBootstrapModule} from 'ng-formly';
import { Ng2CompleterModule } from "ng2-completer";
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { Select2Module } from 'ng2-select2';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AuthGuard } from '../../_guards/index';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {NgxUIModule} from '@swimlane/ngx-ui';
//import {ModalModule} from "ngx-modal";
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//import {DatapickerModalComponent} from '../theme/components/datapicker-modal/datapicker-modal.component';
//import {DatapickerModalModule} from '../../../../theme/components/datapicker-modal/datapicker-modal.module';
import { DatapickerModalModule } from '../../theme/components/datapicker-modal/datapicker-modal.module';
import { TrainingsComponent } from './trainings/trainings.component';
import { EventsComponent } from './events/events.component';
import { CommunicationComponent } from './communication/communication.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


export const routes = [
  { path: '', redirectTo: 'general', pathMatch: 'full'},
  { path: 'parish', component: ParishComponent, data: { breadcrumb: 'Parishes' }, canActivate: [AuthGuard] },
  { path: 'general', component: GeneralComponent, data: { breadcrumb: 'General' }, canActivate: [AuthGuard] },
  { path: 'groups', component: GroupsComponent, data: { breadcrumb: 'Group & Department' }, canActivate: [AuthGuard]},
  { path: 'trainings', component: TrainingsComponent, data: { breadcrumb: 'Trainings' }, canActivate: [AuthGuard]},
  { path: 'events', component: EventsComponent, data: { breadcrumb: 'Events' }, canActivate: [AuthGuard]},
  { path: 'communications', component: CommunicationComponent, data: { breadcrumb: 'Communication' }, canActivate: [AuthGuard]},
  { path: 'user-roles', component: UserRolesComponent, data: { breadcrumb: 'Users And Roles' }, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        RouterModule.forChild(routes),
        PopoverModule,
        FormlyModule.forRoot(),
        FormlyBootstrapModule,
        Ng2CompleterModule,
        CommonModule,
        NguiAutoCompleteModule,
        Select2Module,
        Ng2Bs3ModalModule,
        NgxDatatableModule,
        NgxUIModule,
        ModalModule,
        NgbModule,
        DatapickerModalModule,
        ModalModule.forRoot(),
    BootstrapModalModule,
        AgGridModule.withComponents(
            [RedComponentComponent]
        )
    ],
    declarations: [
        ParishComponent,
        GeneralComponent,
        RedComponentComponent,
        GroupsComponent,
        TrainingsComponent,
        EventsComponent,
        CommunicationComponent,
        UserRolesComponent
    ]
})
export class SettingsModule {

}
