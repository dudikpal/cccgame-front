import {Component, Input} from '@angular/core';
import {BaseCard} from "../../../models/BaseCard";
import {AdminService} from "../../../services/admin.service.";
import {PlayerCard} from "../../../models/PlayerCard";

@Component({
  selector: 'app-base-card-list',
  templateUrl: './base-card-list.component.html',
  styleUrls: ['./base-card-list.component.css']
})
export class BaseCardListComponent {

  @Input() playerCards!: PlayerCard[];

  constructor(
      private adminService: AdminService
  ) {
  }

  getFilteredBaseCards() {
    return this.adminService.playerCards;
  }

  selectCard(playerCard: PlayerCard) {
    this.adminService.selectedCard = playerCard;
  }
}
