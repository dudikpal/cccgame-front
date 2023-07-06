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

  constructor(
      private mainService: MainService
  ) {
    console.log('constructorban');
    console.log(this.selectedCards.length);
    console.log(this.nestedArray.length);
  }

  ngOnInit(): void {
    console.log('onInintben');
    console.log(this.selectedCards.length);
    console.log(this.nestedArray.length);
  }

  onDrop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
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