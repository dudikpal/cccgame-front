import {Component, Input} from '@angular/core';
import {IBaseCard} from "../../models/IBaseCard.";

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
}
