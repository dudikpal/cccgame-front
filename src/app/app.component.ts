import {Component, OnChanges, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "../environments/environment";
import {LoggedInGuardService} from "./login/logged-in-guard.service";
import {EventService} from "./event.service";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnChanges {
    title = 'Car Cards Collecting Game';
    endpointPrefix = environment.endpointPrefix;

    constructor(private router: Router,
                public authService: LoggedInGuardService,
                public mainService: EventService) {

    }

    ngOnInit(): void {

    }

    ngOnChanges(): void {
        console.log('app-compban: ' + this.mainService.userIsLoggedIn)
    }


    public async logout() {
        //sessionStorage.removeItem('AuthToken');
        this.mainService.userIsLoggedIn = false;
        /*const response = await fetch(this.endpointPrefix + "/api/auth/signout", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const jsonData = await response.json();
        console.log(jsonData);*/
        this.router.navigate(['/login']);
    }
}
