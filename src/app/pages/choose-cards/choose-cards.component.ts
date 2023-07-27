import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {PlayerCard} from "../../models/PlayerCard";
import {MatExpansionPanel} from "@angular/material/expansion";
import {MainService} from "../../services/main.service";

@Component({
  selector: 'app-choose-cards',
  templateUrl: './choose-cards.component.html',
  styleUrls: ['./choose-cards.component.css']
})
export class ChooseCardsComponent implements OnInit{

  selectedCard!: any;
  selectedCards = this.mainService.playerCards;
  nestedArray = this.mainService.playerCards;
  idList: any[] = [];
  selectedCard1: any[] = [];
  selectedCard2: any[] = [];
  selectedCard3: any[] = [];
  selectedCard4: any[] = [];
  selectedCard5: any[] = [];
  isDisabled: boolean = false;

  constructor(
      private mainService: MainService
  ) {
    console.log('constructorban');
    console.log(this.selectedCards.length);
    console.log(this.nestedArray.length);
  }

  ngOnInit(): void {
    console.log('onInintben');
    this.selectedCard1.push(this.mainService.playerCardSkeleton);
    this.selectedCard2.push(this.mainService.playerCardSkeleton);
    this.selectedCard3.push(this.mainService.playerCardSkeleton);
    this.selectedCard4.push(this.mainService.playerCardSkeleton);
    this.selectedCard5.push(this.mainService.playerCardSkeleton);
  }

  onDrop(event: CdkDragDrop<any>) {

    console.log('choosecard ondropban');

    const cardId = event.item.data.id;
    const cardName = event.previousContainer.data[event.previousIndex].baseCard.id;
    const card = document.querySelector(`#card_${CSS.escape(cardId)}`);
    card!.classList.add('disabled');
    //console.log(card!.classList.value);
    //this.mainService.onDrop(event);
    //console.log(event.previousContainer.data);
    //console.log(event.previousContainer.data[event.previousIndex].baseCard.imageUrl);
    //console.log(event.previousIndex);
    //console.log(cardId);
    //console.log(cardName);
    //console.log(this.selectedCard1);
    //this.selectedCard1 = [event.previousContainer.data[event.previousIndex]];
    /*this.selectedCard1 = this.selectedCards.filter(
        (card: { id: any; }) => card.id === event.item.data.id
    );*/
    const cardIndex = this.selectedCards.findIndex((card: { id: any; }) => card.id === cardId);
    //console.log(cardIndex);
    copyArrayItem(this.selectedCards,
        event.container.data,
        cardIndex,
        0);
    console.log(this.selectedCard1);
    console.log(this.selectedCard2);
    console.log(this.selectedCard3);
    console.log(this.selectedCard4);
    console.log(this.selectedCard5);
    //console.log(event.item.data.id);

  }

  mouseEnterHandler(
      event: MouseEvent,
      chapterExpansionPanel: MatExpansionPanel
  ) {
    if (event.buttons && !chapterExpansionPanel.expanded) {
      chapterExpansionPanel.open();
    }
  }

  toggleDisable() {
    this.mainService.toggleDisable();
  }

  rechooseCards() {
    this.selectedCard1 = [this.mainService.playerCardSkeleton];
    this.selectedCard2 = [this.mainService.playerCardSkeleton];
    this.selectedCard3 = [this.mainService.playerCardSkeleton];
    this.selectedCard4 = [this.mainService.playerCardSkeleton];
    this.selectedCard5 = [this.mainService.playerCardSkeleton];
  }
}