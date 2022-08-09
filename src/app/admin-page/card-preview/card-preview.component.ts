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
       /* this.cardPlace = document.createElement('div');
        this.cardPlace.style.width = '280px';
        this.cardPlace.style.height = '420px';
        this.cardPlace.style.backgroundColor = 'grey';
        document.appendChild(this.cardPlace);*/
        //console.log(this.selectedCard)
    }

    ngOnChanges(changes: SimpleChanges): void {



        /*if (Object.entries(this.selectedCard).length) {
            console.log(this.selectedCard)

        } else {

        }*/
        //console.log(this.selectedCard)

    }

}
