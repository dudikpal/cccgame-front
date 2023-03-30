import {Component} from '@angular/core';
import {AdminService} from "../services/admin.service.";
import {IBaseCard} from "../models/IBaseCard.";

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent {

	isCollapsed = false;
	url = "http://localhost:8080/api/basecard"
	searchFieldsVisibility = false;
	baseCards!: IBaseCard[];

	constructor(
		private adminService: AdminService
	) {
	}

	loadBaseCardsFromFile() {
		let input = document.createElement('input');
		input.type = 'file';

		input.onchange = e => {
			let file = input.files![0];
			let reader = new FileReader();
			reader.readAsText(file, 'UTF-8');

			reader.onload = readerEvent => {
				let content = readerEvent.target!.result;

				fetch(this.url + '/bulk', {
					method: "POST",
					body: content,
					headers: {
						"Content-Type": "application/json"
					}
				});
			}
		}
		input.click();
	}

	dropBaseCardsTable() {
		if (confirm('Will be delete all baseCards from collection!!\nAre you sure?')) {
			fetch(this.url, {
				method: "DELETE"
			});
		}
	}

	toggleSearchFields() {
		this.searchFieldsVisibility = ! this.searchFieldsVisibility;
	}

	getFilteredBaseCards() {
		 this.baseCards = this.adminService.baseCards;
	}
}
