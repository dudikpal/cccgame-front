import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {CardModel} from "../../../card/card.model";
import {EventService} from "../../../event.service";


@Component({
    selector: 'app-card-list-item',
    templateUrl: './card-list-item.component.html',
    styleUrls: ['./card-list-item.component.css']
})
export class CardListItemComponent implements OnInit {

    @Input() cardList!: CardModel[];
    selectedCard!: CardModel;

    constructor(
        private eventService: EventService
    ) {
    }

    ngOnInit() {

    }

    onClick(card: CardModel) {

        return this.eventService.emitChildEvent(card);
    }


}
