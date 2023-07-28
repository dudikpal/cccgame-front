import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {BaseCard} from "../models/BaseCard";
import {PlayerCard} from "../models/PlayerCard";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  playerCardSkeleton!: PlayerCard;
  playerCards!: PlayerCard[];

  constructor() {
    this.getPlayerCardSkeleton().then((skeleton) => {
      this.playerCardSkeleton = skeleton;
    });
    this.getPlayerCards().then((playerCards) => {
      this.playerCards = playerCards;
    });
  }

  async getPlayerCardSkeleton() {
    const response = await fetch(environment.endpointPrefix + '/api/playercard/skeleton');
    const data = await response.json();
    return data;
  }

  async getPlayerCards() {
    const response = await fetch(environment.endpointPrefix + '/api/playercard'
        /*,
        {
          method: "POST",
          body: JSON.stringify({}),
          headers: {
            "Content-Type": "application/json"
          }
        }*/
        );
      const data = await response.json();
      //this.playerCards = data;
      return data;
  }

  onDrop(event: CdkDragDrop<any>) {
    console.log('mainservice iondropben');
    console.log(event.previousContainer.data[event.previousIndex].baseCard.imageUrl);
    if (event.previousContainer === event.container) {
      //moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // mozgatott kártya
      //console.log(event.previousContainer.data[event.previousIndex].baseCard.imageUrl);
      /*copyArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          0);*/
    }
    /*const cardId = event.previousContainer.data[0].id;
    const card = document.querySelector(`#card_${CSS.escape(cardId)}`);
    card!.classList.add('disabled');
    console.log(card);*/
  }
}
