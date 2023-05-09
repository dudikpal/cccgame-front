import {Component, Input} from '@angular/core';
import {IBaseCard} from "../../models/IBaseCard.";
import {environment} from "../../../environments/environment";

@Component({
	selector: 'app-card-attr-fields',
	templateUrl: './card-attr-fields.component.html',
	styleUrls: ['./card-attr-fields.component.css']
})
export class CardAttrFieldsComponent {

	@Input() baseCard!: IBaseCard;

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
		const response = await fetch(environment.endpointPrefix + '/api/basecard',
			{
				method: "PUT",
				body: JSON.stringify(this.baseCard),
				headers: {
					"Content-Type": "application/json"
				}
			});
		const data = await response.json();
	}
}
