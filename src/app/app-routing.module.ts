import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {ManageBasecardsComponent} from "./admin/manage-basecards/manage-basecards.component";
import {HomeComponent} from "./pages/home/home.component";
import {GarageComponent} from "./pages/garage/garage.component";
import {MainComponent} from "./pages/main/main.component";
import {ChallengesComponent} from "./pages/challenges/challenges.component";
import {ChooseCardsComponent} from "./pages/choose-cards/choose-cards.component";
import {CardsPairingComponent} from "./pages/cards-pairing/cards-pairing.component";

const routes: Routes = [
	//{path: '', redirectTo: 'garage', pathMatch: "full"},
	{path: 'admin', component: AdminComponent,
		children: [
			{path: 'manage-basecards', component: ManageBasecardsComponent}
		]
	},
	/*{path: '', component: MainComponent, redirectTo: '/main', pathMatch: "full"},
	{path: '**', component: MainComponent, redirectTo: '/main', pathMatch: "full"},*/
	//{path: '', component: MainComponent,
	/*{path: '', component: MainComponent,
		children: [
			{path: '', component: HomeComponent},
			{path: 'garage', component: GarageComponent},
			{path: 'challenges', component: ChallengesComponent},*/
	{path: '', component: ChooseCardsComponent},
	{path: 'challenge', component: ChallengesComponent},
	{path: 'cards-pairing', component: CardsPairingComponent}
		//]},
	//{path: '', component: GarageComponent}

];

@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash: false, onSameUrlNavigation: "reload"})],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
