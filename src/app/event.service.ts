import {BehaviorSubject} from "rxjs";
import {environment} from "../environments/environment";
import {Injectable} from "@angular/core";
import {LoginComponent} from "./login/login.component";

@Injectable()
export class EventService {

    endpointPrefix = environment.endpointPrefix;

    private childClickEvent = new BehaviorSubject({});

    public userIsLoggedIn = false;

    public cash = 0;

    public gold = 0;

    public playerCards! : any[];

    public isLoading = false;

    constructor() {
    }

    emitChildEvent(item: any) {
        this.childClickEvent.next(item);
    }

    childEventListener() {
        return this.childClickEvent.asObservable();
    }

    async getPlayerCards() {


        const payLoad = `ccgamer=${sessionStorage.getItem('AuthToken')!.replace(/\"/g, '')}`;

        const response = await fetch(this.endpointPrefix + '/api/garage', {
            headers: {
                'Authorization': payLoad,
            }
        });

        const responseData = await response.json();
        let cards = [];
        //console.log('fetchel');
        for (let i = 0; i < 5; i++) {

        for (const plazerCard of responseData.playerCards) {
            cards.push(plazerCard.card);
        }
        }

        /*setTimeout(() => {
            console.log('kokokokoko');
        }, 5000);*/
        this.playerCards = cards;

        //console.log('fetch ending');
    }
}