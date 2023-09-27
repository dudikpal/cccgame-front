import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CardComponent} from './card/card.component';
import {AdminComponent} from './admin/admin.component';
import {ManageBasecardsComponent} from './admin/manage-basecards/manage-basecards.component';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BaseCardListComponent} from './admin/manage-basecards/base-card-list/base-card-list.component';
import {SearchFieldsComponent} from './admin/manage-basecards/search-fields/search-fields.component';
import {AdminService} from "./services/admin.service.";
import {MainService} from "./services/main.service";
import {CardAttrFieldsComponent} from './admin/card-attr-fields/card-attr-fields.component';
import {HomeComponent} from './pages/home/home.component';
import {GarageComponent} from './pages/garage/garage.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {MainComponent} from './pages/main/main.component';
import {HeaderComponent} from './pages/header/header.component';
import {FooterComponent} from './pages/footer/footer.component';
import {SearchAndFilterBarComponent} from './pages/garage/search-and-filter-bar/search-and-filter-bar.component';
import {CdkScrollableModule, ScrollingModule} from "@angular/cdk/scrolling";
import {MatGridList, MatGridListModule} from "@angular/material/grid-list";
import {ChallengesComponent} from './pages/challenges/challenges.component';
import {ChooseCardsComponent} from './pages/choose-cards/choose-cards.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatExpansionModule} from "@angular/material/expansion";
import {CardsPairingComponent} from './pages/cards-pairing/cards-pairing.component';
import {DropPlacesComponent} from './pages/drop-places/drop-places.component';
import {OpponentHandComponent} from './pages/opponent-hand/opponent-hand.component';
import {RaceComponent} from './pages/race/race.component';
import {RacesComponent} from './pages/races/races.component';
import {ResultComponent} from './pages/result/result.component';
import {RoundsComponent} from './pages/rounds/rounds.component';


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
		SearchAndFilterBarComponent,
		ChallengesComponent,
		ChooseCardsComponent,
		CardsPairingComponent,
		DropPlacesComponent,
		OpponentHandComponent,
		RaceComponent,
		RacesComponent,
		ResultComponent,
		RoundsComponent,
	],
	imports: [
		HttpClientModule,
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		ScrollingModule,
		CdkScrollableModule,
		MatGridListModule,
		DragDropModule,
		MatExpansionModule
	],
	providers: [FormBuilder, AdminService, MainService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
