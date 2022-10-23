import {BehaviorSubject} from "rxjs";
import {environment} from "../environments/environment";
import {EventEmitter, Injectable} from "@angular/core";
import {LoginComponent} from "./login/login.component";

@Injectable()
export class EventService {

    endpointPrefix = environment.endpointPrefix;

    private childClickEvent = new BehaviorSubject({});

    public userIsLoggedIn = false;

    public cash = 0;

    public gold = 0;

    public playerCards! : any[];

    public playerCardSkeleton: any;

    public tuningMultipliers!: any[];

    public createdAt!: Date;

    public isLoading = false;

    public updatedCard: any;

    //public updateCard = new EventEmitter<any>();


    constructor() {
    }

    emitChildEvent(item: any) {
        this.childClickEvent.next(item);
    }

    childEventListener() {
        return this.childClickEvent.asObservable();
    }

    async getPlayerCardSkeleton() {

        const response = await fetch(environment.endpointPrefix + '/api/playercards');
        const json = await response.json();
        this.playerCardSkeleton = json;
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
        this.playerCards = responseData.playerCards;
        //console.log(responseData);
    }


    updateCard(updatedCard: any) {

        //this.updateCardInLocal(updatedCard);
        console.log('updatedCard in mainService: ');
        console.log(updatedCard);
        fetch(environment.endpointPrefix + '/api/cards', {
            method: "PUT",
            body: JSON.stringify(updatedCard),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }



}