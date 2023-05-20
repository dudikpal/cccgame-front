import {Component, Input} from '@angular/core';
import {BaseCard} from "../../../models/BaseCard";
import {AdminService} from "../../../services/admin.service.";

@Component({
  selector: 'app-base-card-list',
  templateUrl: './base-card-list.component.html',
  styleUrls: ['./base-card-list.component.css']
})
export class BaseCardListComponent {

  @Input() baseCards!: BaseCard[];

  constructor(
      private adminService: AdminService
  ) {
  }

  getFilteredBaseCards() {
    return this.adminService.baseCards;
  }

  selectCard(baseCard: BaseCard) {
    this.adminService.selectedCard = baseCard;
  }
}
