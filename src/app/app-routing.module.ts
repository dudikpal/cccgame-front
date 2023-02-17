import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {LoggedInGuardService} from "./login/logged-in-guard.service";
import {GarageComponent} from "./garage/garage.component";
import {RegisterComponent} from "./register/register.component";
import {AdminPageComponent} from "./admin-page/admin-page.component";
import {HomeMainComponent} from "./home/home-main/home-main.component";
import {UpgradeComponent} from "./upgrade/upgrade.component";
import {RacesComponent} from "./home/home-main/races/races.component";

const routes: Routes = [
    //{path: '/', redirectTo: 'login'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent,
        children: [
            {path: '', component: HomeMainComponent},
            {path: 'garage', component: GarageComponent},
            {path: 'races', component: RacesComponent}
        ],
        //canActivate: [LoggedInGuardService]
    },
    {path: 'upgrade', component: UpgradeComponent},
    {path: 'admin', component: AdminPageComponent, canActivate: [LoggedInGuardService]},
    {path: '**', redirectTo: 'login'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
