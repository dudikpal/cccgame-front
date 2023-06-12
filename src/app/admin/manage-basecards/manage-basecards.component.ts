import {AfterViewInit, Component, Input, OnInit, Output} from '@angular/core';
import {AdminService} from "../../services/admin.service.";
import {MainService} from "../../services/main.service";
import {BaseCard} from "../../models/BaseCard";
import {IFilter, ISimpleValue} from "../../models/IFilter";
import {min} from "rxjs";
import {environment} from "../../../environments/environment";
import {PlayerCard} from "../../models/PlayerCard";

@Component({
	selector: 'app-manage-basecards',
	templateUrl: './manage-basecards.component.html',
	styleUrls: ['./manage-basecards.component.css']
})
export class ManageBasecardsComponent implements OnInit, AfterViewInit {

	playerCard!: PlayerCard;
	playerCards!: PlayerCard[];
	baseCard!: BaseCard;
	filters: IFilter = {simpleValues: [], multipleValues: [], betweens: []};

	constructor(
		private adminService: AdminService,
		private mainService: MainService
	) {
		this.baseCard = mainService.playerCardSkeleton.baseCard;
	}

	ngOnInit(): void {
		// ez csak a teszt idejére kell, admin page loadra betölti a card listet
		/*this.fetchFilteredCards()
			.then(() => {
				this.baseCards = this.adminService.baseCards;
			});*/
		this.playerCard = this.mainService.playerCardSkeleton;
		this.adminService.selectedCard = JSON.parse(JSON.stringify(this.playerCard));
	}

	ngAfterViewInit(): void {
	}

	searchFieldsVisible(): boolean {
		return this.adminService.searchFieldsVisibility;
	}

	getSelectedCard() {
		//console.log(this.adminService.selectedCard);
		return this.adminService.selectedCard;
	}

	public getFilters() {

		/*let cardFilter = JSON.parse(JSON.stringify(this.mainService.baseCardSkeleton));
		for (const cardAttribute of this.getObjectEntries(this.baseCardSkeleton)) {
		  const inputField = document.querySelector(`#search_${cardAttribute[0]}`);

		  console.log(cardAttribute[1]);
		  console.log(inputField);
		}*/
		const inputFields = document.querySelectorAll('[data-search]');
		for (const inputField of Array.from(inputFields)) {
			this.addFilter(inputField);
		}
		//console.log(this.filters);
		this.adminService.filters = this.filters;
		return this.filters;
	}

	async fetchFilteredCards() {
		//admin service playerCards-ban már elvileg benne van
	}

	private addFilter(inputField: Element) {
		const attributeName = inputField.getAttribute('data-search')!;
		const value = (inputField as HTMLInputElement).value.trim();

		if (!value) {
			return;
		}
		if (value.includes('+')) {
			this.addBetweenFilter(attributeName, value);
		} else if (value.includes(',')) {
			this.addMultipleValuesFilter(attributeName, value);
		} else {
			this.addSimpleValueFilter(attributeName, value);
		}
	}

	addBetweenFilter(attributeName: string, value: string) {
		const values = value.split('+').map(Number);
		const min = Math.min(...values);
		const max = Math.max(...values);
		this.filters.betweens?.push({
			name: attributeName,
			min: min,
			max: max
		});
	}

	addMultipleValuesFilter(attributeName: string, value: string) {
		const values = value.split(',').map(str => str.trim());
		this.filters.multipleValues?.push({
			name: attributeName,
			values: values
		});
	}

	addSimpleValueFilter(attributeName: string, value: string) {
		const simpleValue: ISimpleValue = {name: attributeName, value: value};
		this.filters.simpleValues?.push(simpleValue);
	}

}
