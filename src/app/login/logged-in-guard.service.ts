import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {EventService} from "../event.service";

@Injectable()
export class LoggedInGuardService implements CanActivate {

    public token!: string | null;
    public userId = '';
    public garageId = "empty";
    endpointPrefix = environment.endpointPrefix;
    public cards: any[] = [];
    public isLoading = false;


    constructor(private _router: Router,
                private mainService: EventService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        if (!this.mainService.userIsLoggedIn) {
            this._router.navigate(['/login']);
            return false;
        }

        return true;
    }



    async sendLoginDataToBack(username: string, password: string) {

        const reqBody = JSON.stringify({"username": username, "password": password});
        const response = await fetch(this.endpointPrefix + "/api/auth/signin", {
            method: 'POST',
            body: reqBody,
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status < 400) {

            const jsonData = await response.json();
            this.token = jsonData['jwt'].match(/(?<=ccgamer=).*?(?=;)/g).toString();
            console.log(jsonData);
            sessionStorage.setItem('AuthToken', JSON.stringify(this.token));
            this.mainService.userIsLoggedIn = true;
            await this.mainService.getPlayerCards();
            await this.mainService.getPlayerCardSkeleton();
            this.userId = jsonData['id'];
            this.garageId = jsonData['garageId'];
            //console.log(this.garageId);
            this._router.navigate(['/home']);
            return true;

        } else {
            return false;
        }

    }


    async sendRegisterDataToBack(username: string, email: string, roles: [], password: string) {

        const reqBody = JSON.stringify({"username": username, "email": email, "password": password});
        const response = await fetch(this.endpointPrefix + "/api/auth/signup", {
            method: 'POST',
            body: reqBody,
            headers: {
                "Content-Type": "application/json"
            }
        });

        return response.text();
    }


    parseJwt(token: string) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        console.log(jsonPayload);

        return JSON.parse(jsonPayload);
    };
}
