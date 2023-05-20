import {Component, Input, OnInit} from '@angular/core';
import {BaseCard} from "../../models/BaseCard";
import {environment} from "../../../environments/environment";
import {AdminService} from "../../services/admin.service.";
import {MainService} from "../../services/main.service";
import {isEmpty} from "rxjs";

@Component({
	selector: 'app-card-attr-fields',
	templateUrl: './card-attr-fields.component.html',
	styleUrls: ['./card-attr-fields.component.css']
})
export class CardAttrFieldsComponent implements OnInit{

	@Input() baseCard!: BaseCard;

	constructor(
		private adminService: AdminService,
		private mainService: MainService
	) {
	}

	ngOnInit(): void {
		//this.baseCard = this.mainService.baseCardSkeleton;
	}
// alapb=l meg kell jelennie ay attributoknak


	getObjectEntries(baseCard: any) {
		return Object.entries(baseCard);
	}

	async updateBaseCard() {
		const attrFields = document.querySelectorAll('[data-card_attribute]');
		for (const attrField of Array.from(attrFields)) {
			const attributeName = attrField.getAttribute('data-card_attribute')!;
			const value = (attrField as HTMLInputElement).value.trim();
			(this.baseCard as any)[attributeName] = value;
		}
		this.adminService.updateBaseCard(this.baseCard);
	}

	deleteBaseCard() {
		this.adminService.deleteBaseCard(this.baseCard);
	}

	bulkUpdateBaseCard() {
		const attrFields = document.querySelectorAll('[data-card_attribute]');
		let baseCards: BaseCard[] = [];
		for (const baseCard of this.adminService.baseCards) {

			for (const attrField of Array.from(attrFields)) {

				const attributeName = attrField.getAttribute('data-card_attribute')!;
				const value = (attrField as HTMLInputElement).value.trim();

				if (!!value) {
					(baseCard as any)[attributeName] = value;
					baseCards.push(baseCard);
				}
			}
		}
		this.adminService.bulkUpdateBaseCard(baseCards);
	}
}
