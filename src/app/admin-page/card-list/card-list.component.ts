import {AfterViewInit, Component, Input, OnInit, Output} from '@angular/core';
import {CardModel} from "../../card/card.model";

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit, AfterViewInit {

    @Input() cardList!: CardModel[];


  constructor(
  ) { }

  ngOnInit() {

  }

    ngAfterViewInit(): void {

    }


}
