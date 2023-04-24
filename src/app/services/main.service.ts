import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {IBaseCard} from "../models/IBaseCard.";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  baseCardSkeleton!: IBaseCard;

  constructor() {
    this.getBaseCardSkeleton().then((skeleton) => {
      this.baseCardSkeleton = skeleton;
    });
  }

  async getBaseCardSkeleton() {
    const response = await fetch(environment.endpointPrefix + '/api/basecard/skeleton');
    const data = await response.json();
    return data;
  }
}
