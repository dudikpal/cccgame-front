import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {ManageBasecardsComponent} from "./admin/manage-basecards/manage-basecards.component";
import {HomeComponent} from "./pages/home/home.component";
import {GarageComponent} from "./pages/garage/garage.component";
import {MainComponent} from "./pages/main/main.component";

const routes: Routes = [
	{path: 'admin', component: AdminComponent,
		children: [
			{path: 'manage-basecards', component: ManageBasecardsComponent}
		]
	},
	/*{path: '', component: MainComponent, redirectTo: '/main', pathMatch: "full"},
	{path: '**', component: MainComponent, redirectTo: '/main', pathMatch: "full"},*/
	{path: '', component: MainComponent,
		children: [
			{path: '', component: HomeComponent},
			{path: 'garage', component: GarageComponent}
		]},

];

@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash: false})],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
