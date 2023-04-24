import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { AdminComponent } from './admin/admin.component';
import { ManageBasecardsComponent } from './admin/manage-basecards/manage-basecards.component';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BaseCardListComponent } from './admin/manage-basecards/base-card-list/base-card-list.component';
import { SearchFieldsComponent } from './admin/manage-basecards/search-fields/search-fields.component';
import {AdminService} from "./services/admin.service.";
import {MainService} from "./services/main.service";

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    AdminComponent,
    ManageBasecardsComponent,
    BaseCardListComponent,
    SearchFieldsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [FormBuilder, AdminService, MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
