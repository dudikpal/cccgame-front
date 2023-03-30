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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BaseCardListComponent } from './admin/manage-basecards/base-card-list/base-card-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    AdminComponent,
    ManageBasecardsComponent,
    BaseCardListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
