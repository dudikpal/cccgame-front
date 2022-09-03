import {BehaviorSubject} from "rxjs";

export class EventService {

    private childClickEvent = new BehaviorSubject({});

    private userIsLoggedIn = false;

    private cash = 0;

    private gold = 0;

    private cards: any;

    emitChildEvent(card: any) {
        this.childClickEvent.next(card);
    }

    childEventListener() {
        return this.childClickEvent.asObservable();
    }
}