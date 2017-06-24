import 'pace';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AgmCoreModule} from 'angular2-google-maps/core';

import {routing} from './app.routing';
import {AppConfig} from './app.config';

import {AppComponent} from './app.component';
import {ErrorComponent} from './pages/error/error.component';
import {ClientComponent} from './client/client.component';

// import { DataTableModule } from 'angular2-datatable'; import {
// DataTablesModule } from 'angular-datatables';
import {HttpModule} from '@angular/http';
import {MomentModule} from 'angular2-moment/moment.module';

import {SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry} from 'angular2-schema-form';
//import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// ag-grid
import {AgGridModule} from "ag-grid-angular/main";
import { PopoverModule } from 'ng2-pop-over';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FormlyModule, FormlyBootstrapModule} from 'ng-formly';
import { Ng2CompleterModule } from "ng2-completer";
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { Select2Module } from 'ng2-select2';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { CustomFormsModule } from 'ng2-validation';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {NgxUIModule} from '@swimlane/ngx-ui';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//import {IqSelect2Module} from '../../node_modules/ng2-iq-select2/src/app/component-wrapper/src/app/iq-select2.module';
//import { IqSelect2Module } from 'ng2-iq-select2';

@NgModule({
  declarations: [
    AppComponent, ErrorComponent, ClientComponent
  ],
  exports: [ 
        FormsModule,
        ReactiveFormsModule,
    ],
  imports: [
    HttpModule,
    CustomFormsModule,
    MomentModule,
    BrowserModule,
    ReactiveFormsModule,
    SchemaFormModule,
    Ng2Bs3ModalModule,
    NguiAutoCompleteModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    Ng2CompleterModule,
    NgxDatatableModule,
    Select2Module,
    ModalModule.forRoot(),
    //IqSelect2Module,
    BootstrapModalModule,
    NgxUIModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDe_oVpi9eRSN99G4o6TwVjJbFBNr58NxE'}),
    PopoverModule,
    FormsModule,
    routing
  ],
  providers: [
    
    AppConfig, {
      provide: WidgetRegistry,
      useClass: DefaultWidgetRegistry
    }
  ], //,,
  bootstrap: [AppComponent]
})
export class AppModule {}