import {Component, Input} from '@angular/core';
import {IBaseCard} from "../../../models/IBaseCard.";
import {AdminService} from "../../../services/admin.service.";

@Component({
  selector: 'app-base-card-list',
  templateUrl: './base-card-list.component.html',
  styleUrls: ['./base-card-list.component.css']
})
export class BaseCardListComponent {

  @Input() baseCards!: IBaseCard[];

  constructor(
      private adminService: AdminService
  ) {
  }

  getFilteredBaseCards() {
    return this.adminService.baseCards;
  }

  selectCard(baseCard: IBaseCard) {
    this.adminService.selectedCard = baseCard;
  }
}
