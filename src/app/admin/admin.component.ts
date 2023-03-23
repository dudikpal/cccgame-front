import {Component} from '@angular/core';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent {

	isCollapsed = false;
	url = "http://localhost:8080/api/basecard"
	searchFieldsVisibility = false;

	constructor() {
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
}
