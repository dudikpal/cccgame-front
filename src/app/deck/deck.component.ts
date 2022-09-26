import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EventService} from "../event.service";
import {Event} from "@angular/router";
import {window} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {PopupImgComponent} from "../card/popup-img/popup-img.component";

@Component({
    selector: 'app-deck',
    templateUrl: './deck.component.html',
    styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

    //@Input() cardList: any;
    page = 1;
    count = 0;
    itemsPerPage = 10;
    cardList: any[] = [];

    constructor(
        private eventService: EventService,
        private http: HttpClient,
    ) {
    }

    ngOnInit(): void {
        this.cardList = this.eventService.playerCards;
        console.log('deckben');
        console.log(this.cardList);
        this.count = this.cardList.length;
        /*this.getAllCard().subscribe(
            list => this.cardList = list,
            err => console.error(err),
            //() => console.log('Unsubscribed')
        );*/


    }

    onDataChange(event: any) {
        this.page = event;
    }

    getAllCard() {


        //let url = 'http://localhost:8080/api/cards';

        //return this.http.get(url);
        // erre még rá kell nézni
        /*const response = fetch(
            url,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
            mode: "no-cors"
            }
        );
        console.log('response')
        console.log(response)*/

    }

}
