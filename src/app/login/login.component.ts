import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LoggedInGuardService} from "./logged-in-guard.service";
import {AppComponent} from "../app.component";
import {Router} from "@angular/router";
import {EventService} from "../event.service";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {

    public username = '';
    public password = '';
    public loginValid = true;

    isAuthenticated: boolean = false;

    constructor(
        private authService: LoggedInGuardService,
        private appComponent: AppComponent,
        private router: Router
    ) {
    }

    public ngOnInit(): void {

    }

    public ngOnDestroy(): void {
    }

    public async onSubmit() {

        console.log('before senddataback');
        this.authService.isAuthenticated = await this.authService.sendLoginDataToBack(this.username, this.password);
        console.log('after senddataback');

        if (this.authService.isAuthenticated) {
            //this.mainService.getPlayerCards();
        }
    }

    toRegistration() {
        this.router.navigate(['/register']);
    }
}
