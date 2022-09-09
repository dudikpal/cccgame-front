import {FlexLayoutModule} from '@angular/flex-layout';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LoggedInGuardService} from "./login/logged-in-guard.service";
import {GarageComponent} from './garage/garage.component';
import {RegisterComponent} from './register/register.component';
import {MatDialogModule} from "@angular/material/dialog";
import {EventService} from "./event.service";
import {CardComponent} from "./card/card.component";
import {DeckComponent} from "./deck/deck.component";
import {TabContentComponent} from "./card/tab-content/tab-content.component";
import {TextVarSizeBlockComponent} from "./card/text-var-size-block/text-var-size-block.component";
import {AdminPageComponent} from "./admin-page/admin-page.component";
import {SelectButtonComponent} from "./card/select-button/select-button.component";
import {InputFieldComponent} from "./admin-page/input-field/input-field.component";
import {CardListItemComponent} from "./admin-page/card-list/card-list-item/card-list-item.component";
import {SearchFieldsComponent} from "./admin-page/search-fields/search-fields.component";
import {CardListComponent} from "./admin-page/card-list/card-list.component";
import {FightTableComponent} from "./fight-table/fight-table.component";
import {PopupImgComponent} from "./card/popup-img/popup-img.component";
import {PopupButtonComponent} from "./card/popup-button/popup-button.component";
import {LockedImgComponent} from "./card/locked-img/locked-img.component";
import {CheckFieldComponent} from "./admin-page/check-field/check-field.component";
import {CardPreviewComponent} from "./admin-page/card-preview/card-preview.component";
import {HttpClientModule} from "@angular/common/http";
import { HomeMainComponent } from './home/home-main/home-main.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        GarageComponent,
        RegisterComponent,
        CardComponent,
        DeckComponent,
        TabContentComponent,
        TextVarSizeBlockComponent,
        AdminPageComponent,
        SelectButtonComponent,
        InputFieldComponent,
        CheckFieldComponent,
        CardPreviewComponent,
        CardListComponent,
        CardListItemComponent,
        SearchFieldsComponent,
        FightTableComponent,
        PopupImgComponent,
        PopupButtonComponent,
        LockedImgComponent,
        HomeMainComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FlexLayoutModule,
        FormsModule,
        MatToolbarModule,
        MatInputModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatOptionModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        NgxPaginationModule,
    ],
    providers: [
        LoggedInGuardService,
        FormBuilder,
        EventService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
