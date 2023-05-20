import {Component, OnInit} from '@angular/core';
import {MainService} from "../../services/main.service";

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.css']
})
export class GarageComponent implements OnInit{

  page = 1;
  count = 0;
  itemsPerPage = 10;
  playerCards: any[] = [];

  constructor(
      private mainService: MainService
  ) {
  }

  ngOnInit(): void {
    this.playerCards = this.mainService.playerCards;
    this.count = this.playerCards.length;
  }

  onDataChange(event: any) {
    this.page = event;
  }
}
