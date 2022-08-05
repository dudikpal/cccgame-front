import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {AppComponent} from "../app.component";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements CanActivate {

    BASE_PATH = environment.urlPrefix;
    USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
    isAuthenticated = false;
    public username!: String;
    public password!: String;
    resJson!: string;

    constructor(private http: HttpClient,
                private router: Router) {

    }

    authenticationService(username: string, password: string) {

        this.signinToBack(username, password);


        /*return this.http.get(this.BASE_PATH + `/api/v1/basicauth`,
            {headers: {authorization: this.createBasicAuthToken(username, password)}}).pipe(map((res) => {
            this.username = username;
            this.password = password;
            this.registerSuccessfulLogin(username, password);
        }));*/
    }

    async signinToBack(username: string, password: string) {
        const reqBody = JSON.stringify({"username": username, "password": password});

        const response = await fetch(this.BASE_PATH + "/api/v1/signin", {
            method: 'POST',
            body: reqBody,
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.text();
        this.resJson = json;
        console.log('ReqBody: ' + reqBody);
        console.log('responseText: ' + json);
        console.log('this.resJson: ' + this.resJson);
        //console.log();

        if (this.resJson.includes('stranger')) {
            console.log('json length < 3');
            console.log(json);
        } else {
            //this.username = json.match(/(?<=username:).*(?=,)/g)!.toString().trim();
            //this.password = json.match(/(?<=password:).*(?=})/g)!.toString().trim();
            this.registerSuccessfulLogin(username, password);

        }


        /*if (response.status < 400) {

          //const jsonData = await response.json();
          //this.token = jsonData['jwt'].match(/(?<=ccgamer=).*?(?=;)/g).toString();

          //sessionStorage.setItem('AuthToken', JSON.stringify(this.token))
          this.isAuthenticated = true;
          this.router.navigate(['/home']);


        } else {

        }*/
    }

    createBasicAuthToken(username: String, password: String) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username: string, password: string) {
        this.isAuthenticated = true;
        //this.menubar.isAuthenticated = true;
        //sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    }

    logout() {
        sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);

        this.username = '';

        this.password = '';
    }

    isUserLoggedIn() {
        //let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
        //if (user === null) return false
        /*if (!this.isAuthenticated) return false
        return true*/
        return this.isAuthenticated;
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return 'nincs loggedin name'
        return user
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.isAuthenticated) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
