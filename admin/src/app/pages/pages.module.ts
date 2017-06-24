import { NgModule } from '@angular/core';

import { p404Component } from './404.component';
import { p500Component } from './500.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [PagesRoutingModule, FormsModule,
    ReactiveFormsModule, CommonModule, ToasterModule ],
  declarations: [
    p404Component,
    p500Component,
    LoginComponent,
    RegisterComponent
  ]
})
export class PagesModule { }
