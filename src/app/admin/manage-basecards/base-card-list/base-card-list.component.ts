import {Component, Input} from '@angular/core';
import {IBaseCard} from "../../../models/IBaseCard.";

@Component({
  selector: 'app-base-card-list',
  templateUrl: './base-card-list.component.html',
  styleUrls: ['./base-card-list.component.css']
})
export class BaseCardListComponent {

  @Input() baseCards!: IBaseCard[];
}
