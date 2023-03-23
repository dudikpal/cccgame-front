import { Injectable } from '@angular/core';
import {HttpRequest} from "@angular/common/http";
import {IBaseCard} from "../models/IBaseCard.";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseCards!: IBaseCard[];

  constructor() { }

  async getFilteredBaseCards() {
    const response = await fetch('http://localhost:8080/api/basecard');
    this.baseCards = await response.json();
  }
}
