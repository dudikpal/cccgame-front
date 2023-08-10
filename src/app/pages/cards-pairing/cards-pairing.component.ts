import { Component } from '@angular/core';
import {MainService} from "../../services/main.service";
import {CdkDragDrop, copyArrayItem, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-cards-pairing',
  templateUrl: './cards-pairing.component.html',
  styleUrls: ['./cards-pairing.component.css']
})
export class CardsPairingComponent {

  pairedCard1 = this.mainService.pairedCard1;
  pairedCard2 = this.mainService.pairedCard2;
  pairedCard3 = this.mainService.pairedCard3;
  pairedCard4 = this.mainService.pairedCard4;
  pairedCard5 = this.mainService.pairedCard5;

  constructor(
      private mainService: MainService
  ) {
  }

  onDrop(event: CdkDragDrop<any>) {
    console.log(event.item.data[0].id);
    console.log(event.previousContainer.data[event.previousIndex].id);
    const cardId = event.item.data[0].id;
    const cardName = event.previousContainer.data[event.previousIndex].baseCard.id;
    const card = document.querySelector(`#card_${CSS.escape(cardId)}`);
    console.log(cardId);
    console.log(cardName);
    console.log(card);
    transferArrayItem(event.item.data,
        event.container.data,
        0,
        0);
    console.log(event.container.data);
    //card!.classList.add('disabled');
    /*const cardIndex = this.selectedCards.findIndex((card: { id: any; }) => card.id === cardId);
    copyArrayItem(this.selectedCards,
        event.container.data,
        cardIndex,
        0);
    console.log(event.container.id);
    console.log(cardIndex);*/
  }

  pairCards() {
    this.mainService.selectedCard1 = this.pairedCard1;
    this.mainService.selectedCard2 = this.pairedCard2;
    this.mainService.selectedCard3 = this.pairedCard3;
    this.mainService.selectedCard4 = this.pairedCard4;
    this.mainService.selectedCard5 = this.pairedCard5;
    console.log(this.pairedCard1);
    console.log(this.mainService.selectedCard1);
    console.log(this.pairedCard2);
    console.log(this.mainService.selectedCard2);
    console.log(this.pairedCard3);
    console.log(this.mainService.selectedCard3);
    console.log(this.pairedCard4);
    console.log(this.mainService.selectedCard4);
    console.log(this.pairedCard5);
    console.log(this.mainService.selectedCard5);

  }
}
