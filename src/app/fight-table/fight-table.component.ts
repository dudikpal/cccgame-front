import {Component, OnInit} from '@angular/core';
import {CardModel} from "../card/card.model";
import {log} from "util";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {EventService} from "../event.service";

@Component({
    selector: 'app-fight-table',
    templateUrl: './fight-table.component.html',
    styleUrls: ['./fight-table.component.css']
})
export class FightTableComponent implements OnInit {

    cardDTO = new CardModel();
    event!: Event;
    selectedCardPlace!: string;
    selectableCardPlaces: string[] = [];
    cardPlaces!: NodeListOf<Element>;
    filledCardPlacesIds: string[] = [];
    playerCards = this.service.playerCards;

    todo = [
        '/assets/img/cars/2007_audi_a4_71215.webp',
        '/assets/img/cars/2015_bentley_continental-gt3-r_44722.webp',
        '/assets/img/cars/cupra-leon-2.0-tsi-evo-300hp-dsg-42357.webp',
        '/assets/img/cars/suzuki-liana-1-6-glx_47096.webp'
    ];

    done = [
        'Get up',
        'Brush teeth',
        'Take a shower',
        'Check e-mail',
        'Walk dog'
    ];




    constructor(
        private service: EventService
    ) {
    }

    ngOnInit(): void {
        console.log('ittjarok');
        this.cardPlaces = document.querySelectorAll('.card-place');
        this.initSelectableCardPlaces();

        this.cardPlaces.forEach(cardPlace => {
            cardPlace.addEventListener('click', () => {
                this.toggleActiveCardPlace(cardPlace);
                cardPlace.classList.add('filled');
                console.log(cardPlace.classList);
            });
        });
    }

    toggleActiveCardPlace(cardPlace: Element) {
        const cardPlaceClasslist = cardPlace.children[0].classList;
        cardPlaceClasslist.toggle('active');
        cardPlaceClasslist.toggle('card-placeholder');
        const selectedCardPlaceId = this.getCardPlaceId(cardPlace);
        this.initSelectableCardPlaces();
        this.selectableCardPlaces = this.selectableCardPlaces.filter(cp => cp !== selectedCardPlaceId);
        console.log(this.selectableCardPlaces);
    }

    initSelectableCardPlaces() {
        this.selectableCardPlaces = [];
        this.cardPlaces.forEach(cardPlace => {
            this.selectableCardPlaces.push(this.getCardPlaceId(cardPlace))
        });
    }

    selectCardPlace(event: Event) {
        console.log();
    }


    private getCardPlaceId(cardPlace: Element) {
        return cardPlace.attributes.getNamedItem('id')!.value;
    }

    drop(event: CdkDragDrop<any[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
    }
}
