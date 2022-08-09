import {Component, Input, OnInit} from '@angular/core';
import {Event} from "@angular/router";
import {EventService} from "../../event.service";
import {PopupImgComponent} from "../popup-img/popup-img.component";
import {MatDialog} from "@angular/material/dialog";
import {CardModel} from "../card.model";

@Component({
    selector: 'app-popup-button',
    templateUrl: './popup-button.component.html',
    styleUrls: ['./popup-button.component.css']
})
export class PopupButtonComponent implements OnInit {

    @Input() card!: CardModel;


    constructor(
        private eventService: EventService,
        private dialog: MatDialog,
    ) {}

    ngOnInit(): void {
    }

    showPopUpImage(event: Event) {
        // @ts-ignore
        event.stopPropagation();
        let dialogRef = this.dialog.open(PopupImgComponent);
        dialogRef.componentInstance.popupCard = this.card;
    }
}
