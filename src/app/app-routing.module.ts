import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {ManageBasecardsComponent} from "./admin/manage-basecards/manage-basecards.component";

const routes: Routes = [
	{path: 'admin', component: AdminComponent,
		children: [
			{path: 'manage-basecards', component: ManageBasecardsComponent}
		]},

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
