import {Component, OnInit} from '@angular/core';
import {LoggedInGuardService} from "../login/logged-in-guard.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {environment} from "../../environments/environment";
import {CardModel} from "../card/card.model";


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
    playerCards! : CardModel[];
    endpointPrefix = environment.endpointPrefix;

    constructor(private authService: LoggedInGuardService,
                private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {

        //this.tryRequest();
        this.getPlayerCards();

    }

    async getPlayerCards() {

        const payLoad = `ccgamer=${sessionStorage.getItem('AuthToken')!.replace(/\"/g, '')}`;

        const response = await fetch(this.endpointPrefix + '/api/garage', {
            headers: {
                'Authorization': payLoad,
            }
        });
        const responseData = await response.json();
        /*console.log('response.json(): ');
        console.log('json.stringify: '+ JSON.stringify(responseData));*/
        //console.log(responseData.playerCards);

        //this.playerCards = JSON.stringify(responseData);

        let cards = [];
        for (const plazerCard of responseData.playerCards) {
            console.log('playerCard: ');
            console.log(plazerCard.card);
            cards.push(plazerCard.card);
        }

        this.playerCards = cards;
    }

    async tryRequest() {

        const payLoad = `ccgamer=${sessionStorage.getItem('AuthToken')!.replace(/\"/g, '')}`;

        const responsePublic = await fetch(this.endpointPrefix + '/api/test/all');
        const publicText = await responsePublic.text();
        this.publicRole = publicText;

        const responseUserRole = await fetch(this.endpointPrefix + '/api/test/user', {
            headers: {
                'Authorization': payLoad,
            }
        });
        const userText = await responseUserRole.text();
        this.userRole = userText;

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