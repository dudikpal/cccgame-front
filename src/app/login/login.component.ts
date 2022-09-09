import {Component, Injectable, Input, OnDestroy, OnInit} from '@angular/core';
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
    //public isLoading = this.mainService.isLoading;

    constructor(
        private authService: LoggedInGuardService,
        private appComponent: AppComponent,
        private router: Router,
        public mainService: EventService,
    ) {
    }

    public ngOnInit(): void {

    }

    public ngOnDestroy(): void {
    }

    public async onSubmit() {
        this.mainService.isLoading = true;
        this.mainService.userIsLoggedIn = await this.authService.sendLoginDataToBack(this.username, this.password);
        this.mainService.isLoading = false;
    }

    toRegistration() {
        this.router.navigate(['/register']);
    }

    public showSpinner(): void {


    }
}
