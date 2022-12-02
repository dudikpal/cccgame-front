import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CardModel} from "../../card/card.model";

@Component({
    selector: 'app-card-preview',
    templateUrl: './card-preview.component.html',
    styleUrls: ['./card-preview.component.css']
})
export class CardPreviewComponent implements OnInit, OnChanges {

    @Input() selectedCard: any;


    constructor() {
    }

    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges): void {

        //console.log(this.selectedCard.calculatedFields);

    }

}
