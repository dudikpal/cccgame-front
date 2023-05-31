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
import { CardAttrFieldsComponent } from './admin/card-attr-fields/card-attr-fields.component';
import { HomeComponent } from './pages/home/home.component';
import { GarageComponent } from './pages/garage/garage.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { SearchAndFilterBarComponent } from './pages/garage/search-and-filter-bar/search-and-filter-bar.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    AdminComponent,
    ManageBasecardsComponent,
    BaseCardListComponent,
    SearchFieldsComponent,
    CardAttrFieldsComponent,
    HomeComponent,
    GarageComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    SearchAndFilterBarComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [FormBuilder, AdminService, MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
