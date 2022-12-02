import {Component, Input, OnInit} from '@angular/core';
import {EventService} from "../../../event.service";

@Component({
    selector: 'app-card-list-item',
    templateUrl: './card-list-item.component.html',
    styleUrls: ['./card-list-item.component.css']
})
export class CardListItemComponent implements OnInit {

    @Input() cardList!: any[];

    constructor(
        private eventService: EventService
    ) {}

    ngOnInit() {}

    selectCard(card: any) {

        return this.eventService.emitChildEvent(card);
    }
}
