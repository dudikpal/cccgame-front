import {BehaviorSubject} from "rxjs";

export class EventService {

    private childClickEvent = new BehaviorSubject({});

    emitChildEvent(card: any) {
        this.childClickEvent.next(card);
    }

    childEventListener() {
        return this.childClickEvent.asObservable();
    }
}
