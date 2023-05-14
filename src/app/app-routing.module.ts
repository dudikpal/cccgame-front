import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {ManageBasecardsComponent} from "./admin/manage-basecards/manage-basecards.component";
import {HomeComponent} from "./pages/home/home.component";
import {GarageComponent} from "./pages/garage/garage.component";

const routes: Routes = [
	{path: 'admin', component: AdminComponent,
		children: [
			{path: 'manage-basecards', component: ManageBasecardsComponent}
		]},
	{path: '', component: HomeComponent},
	{path: 'home', component: HomeComponent},
	{path: 'garage', component: GarageComponent}

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
