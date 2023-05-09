import {Component, Input} from '@angular/core';
import {IBaseCard} from "../../models/IBaseCard.";
import {environment} from "../../../environments/environment";
import {AdminService} from "../../services/admin.service.";

@Component({
	selector: 'app-card-attr-fields',
	templateUrl: './card-attr-fields.component.html',
	styleUrls: ['./card-attr-fields.component.css']
})
export class CardAttrFieldsComponent {

	@Input() baseCard!: IBaseCard;

	constructor(
		private adminService: AdminService
	) {
	}

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
}
