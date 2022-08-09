import {Component, Input, OnInit} from '@angular/core';
import {CardModel} from "../card.model";

@Component({
    selector: 'app-popup-img',
    templateUrl: './popup-img.component.html',
    styleUrls: ['./popup-img.component.css']
})
export class PopupImgComponent implements OnInit {

    popupCard!: CardModel;
    cardObjectPosition!: string;
    popupImageMultiplier = 1.5;

    constructor() {
    }

    ngOnInit(): void {
        this.positionImageToPopupWindow();
    }


    positionImageToPopupWindow() {

        let horizontalPosition = this.popupCard.objectPositionHorizontal.value;
        let verticalPosition = this.popupCard.objectPositionVertical.value;

        if (horizontalPosition.trim().toLowerCase() === 'center') {
            this.cardObjectPosition = horizontalPosition;
        } else {
            this.cardObjectPosition = this.multiplePositionValues(horizontalPosition) +
                'rem ' + this.multiplePositionValues(verticalPosition) + 'rem';
        }
    }


    multiplePositionValues(position: string) {

        return Number(position.match(/-?\d+/)) * this.popupImageMultiplier;
    }

}
