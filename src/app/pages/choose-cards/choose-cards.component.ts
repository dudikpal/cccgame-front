import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
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
    this.mainService.onDrop(event);
    console.log(event.previousContainer.data[event.previousIndex].baseCard.imageUrl);

    console.log(this.selectedCard1);
    this.selectedCard1 = [event.previousContainer.data[event.previousIndex]];
    console.log(this.selectedCard1);
  }

  mouseEnterHandler(
      event: MouseEvent,
      chapterExpansionPanel: MatExpansionPanel
  ) {
    if (event.buttons && !chapterExpansionPanel.expanded) {
      chapterExpansionPanel.open();
    }
  }
}