import {BehaviorSubject} from "rxjs";
import {environment} from "../environments/environment";
import {CardModel} from "./card/card.model";
import {Injectable} from "@angular/core";

@Injectable()
export class EventService {

    endpointPrefix = environment.endpointPrefix;

    private childClickEvent = new BehaviorSubject({});

    private userIsLoggedIn = false;

    private cash = 0;

    private gold = 0;

    public playerCards!: any[];

    emitChildEvent(card: any) {
        this.childClickEvent.next(card);
    }

    childEventListener() {
        return this.childClickEvent.asObservable();
    }

    /*async getPlayerCards() {

        const payLoad = `ccgamer=${sessionStorage.getItem('AuthToken')!.replace(/\"/g, '')}`;

        const response = await fetch(this.endpointPrefix + '/api/garage', {
            headers: {
                'Authorization': payLoad,
            }
        });

        const responseData = await response.json();
        let cards = [];
        console.log('fetchel mainserviceben');
        for (const plazerCard of responseData.playerCards) {
            cards.push(plazerCard.card);
        }

        this.playerCards = cards;
    }*/
}