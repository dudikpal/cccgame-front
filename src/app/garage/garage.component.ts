import {Component, OnInit} from '@angular/core';
import {LoggedInGuardService} from "../login/logged-in-guard.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {environment} from "../../environments/environment";
import {CardModel} from "../card/card.model";
import {EventService} from "../event.service";


@Component({
    selector: 'app-garage',
    templateUrl: './garage.component.html',
    styleUrls: ['./garage.component.css']
})
export class GarageComponent implements OnInit {

    userRole!: string;
    adminRole!: string;
    publicRole!: string;
    adminButton!: SafeHtml;
    //playerCards = 'Default content';
    playerCards! : any[];
    endpointPrefix = environment.endpointPrefix;

    constructor(
        //private authService: LoggedInGuardService,
                private sanitizer: DomSanitizer,
                public mainService: EventService) {
    }

    ngOnInit(): void {
        console.log('garageinit');
        //this.tryRequest();
        //this.playerCards = this.mainService.playerCards;

    }

    async getPlayerCards() {

        this.playerCards = this.mainService.playerCards;
    }

    async tryRequest() {

        /*const payLoad = `ccgamer=${sessionStorage.getItem('AuthToken')!.replace(/\"/g, '')}`;

        const responsePublic = await fetch(this.endpointPrefix + '/api/test/all');
        const publicText = await responsePublic.text();
        this.publicRole = publicText;

        const responseUserRole = await fetch(this.endpointPrefix + '/api/test/user', {
            headers: {
                'Authorization': payLoad,
            }
        });
        const userText = await responseUserRole.text();
        this.userRole = userText;*/

        /*const responseAdminRole = await fetch(this.endpointPrefix + '/api/test/admin', {
          headers: {
            'Authorization': payLoad
          }
        });
        const adminText = await responseAdminRole.text();
        this.adminRole = adminText;

        const responseAdminPage = await fetch(this.endpointPrefix + '/api/cards/admin', {
          headers: {
            'Authorization': payLoad
          }
        });
        const adminPage = await responseAdminPage.text();

        this.adminButton = this.sanitizer
            .bypassSecurityTrustHtml(adminPage);*/
    }
}