import { Component, OnInit } from '@angular/core';
import {CardModel} from "../card/card.model";

@Component({
  selector: 'app-fight-table',
  templateUrl: './fight-table.component.html',
  styleUrls: ['./fight-table.component.css']
})
export class FightTableComponent implements OnInit {

    cardDTO = new CardModel();

  constructor() { }

  ngOnInit(): void {

  }

}
