import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {BaseCard} from "../models/BaseCard";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  baseCardSkeleton!: BaseCard;
  playerCards!: any;

  constructor() {
    this.getBaseCardSkeleton().then((skeleton) => {
      this.baseCardSkeleton = skeleton;
    });
    this.getPlayerCards().then((playerCards) => {
      this.playerCards = playerCards;
    });
  }

  async getBaseCardSkeleton() {
    const response = await fetch(environment.endpointPrefix + '/api/basecard/skeleton');
    const data = await response.json();
    return data;
  }

  async getPlayerCards() {
    const response = await fetch(environment.endpointPrefix + '/api/basecard',
        {
          method: "POST",
          body: JSON.stringify({}),
          headers: {
            "Content-Type": "application/json"
          }
        });
      const data = await response.json();
      return data;
  }
}
