import {Injectable} from '@angular/core';
import {HttpRequest} from "@angular/common/http";
import {BaseCard} from "../models/BaseCard";
import {BehaviorSubject, Subject} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
	providedIn: 'root'
})
export class AdminService {

	searchFieldsVisibility = false;
	baseCards!: BaseCard[];
	selectedCard!: BaseCard;
	filter!: any;

	constructor() {
	}

	async getFilteredBaseCards() {
		const response = await fetch('http://localhost:8080/api/basecard');
		this.baseCards = await response.json();
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
	}
}
