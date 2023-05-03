import { Injectable } from '@angular/core';
import {HttpRequest} from "@angular/common/http";
import {IBaseCard} from "../models/IBaseCard.";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  searchFieldsVisibility = true;
  baseCards!: IBaseCard[];
  selectedCard!: IBaseCard;
  filter!: any;

  constructor() { }

  async getFilteredBaseCards() {
    const response = await fetch('http://localhost:8080/api/basecard');
    this.baseCards = await response.json();
  }

  toggleSearchFieldsVisibility() {
    this.searchFieldsVisibility = !this.searchFieldsVisibility;
  }
}
