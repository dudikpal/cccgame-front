import {Injectable} from '@angular/core';
import {HttpRequest} from "@angular/common/http";
import {BaseCard} from "../models/BaseCard";
import {BehaviorSubject, Subject} from "rxjs";
import {environment} from "../../environments/environment";
import {PlayerCard} from "../models/PlayerCard";

@Injectable({
	providedIn: 'root'
})
export class AdminService {

	searchFieldsVisibility = true;
	playerCards!: PlayerCard[];
	selectedCard!: PlayerCard;
	filter!: any;

	constructor() {
	}

	async getFilteredBaseCards() {
		const response = await fetch('http://localhost:8080/api/playercard');
		this.playerCards = await response.json();
	}

	toggleSearchFieldsVisibility() {
		this.searchFieldsVisibility = !this.searchFieldsVisibility;
	}

	async updateBaseCard(baseCard: BaseCard) {
		fetch(environment.endpointPrefix + '/api/basecard',
			{
				method: "PUT",
				body: JSON.stringify(baseCard),
				headers: {
					"Content-Type": "application/json"
				}
			});
	}

	async bulkUpdateBaseCard(baseCards: BaseCard[]) {
		fetch(environment.endpointPrefix + '/api/basecard/bulk',
			{
				method: "PUT",
				body: JSON.stringify(baseCards),
				headers: {
					"Content-Type": "application/json"
				}
			});
	}

	deleteBaseCard(baseCard: BaseCard) {
		fetch(environment.endpointPrefix + '/api/basecard',
			{
				method: "DELETE",
				body: JSON.stringify(baseCard.id),
				headers: {
					"Content-Type": "application/json"
				}
			});
		this.deletePlayerCardFromAdminCardsByBaseCardId(baseCard);
	}

	deletePlayerCardFromAdminCardsByBaseCardId(baseCard: BaseCard) {
		this.playerCards = this.playerCards.filter(playerCard => playerCard.baseCard.id !== baseCard.id);
	}
}
