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
}
