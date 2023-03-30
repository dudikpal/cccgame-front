import { Injectable } from '@angular/core';
import {HttpRequest} from "@angular/common/http";
import {IBaseCard} from "../models/IBaseCard.";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  searchFieldsVisibility = false;

  baseCards!: IBaseCard[];

  constructor() { }

  async getFilteredBaseCards() {
    const response = await fetch('http://localhost:8080/api/basecard');
    this.baseCards = await response.json();
  }

  toggleSearchFieldsVisibility() {
    this.searchFieldsVisibility = !this.searchFieldsVisibility;
  }
}
