import {AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
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
export class DeckComponent implements OnInit, OnChanges, AfterViewInit {

    showPopup = false;
    cardList: any;


    constructor(
        private eventService: EventService,
        private http: HttpClient,
    ) {
    }

    ngOnInit(): void {

        this.getAllCard().subscribe(
            list => this.cardList = list,
            err => console.error(err),
            //() => console.log('Unsubscribed')
        );


    }

    ngOnChanges() {

    }

    ngAfterViewInit() {
    }


    getAllCard() {

        let url = 'http://localhost:8080/api/cards';

        return this.http.get(url);
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
