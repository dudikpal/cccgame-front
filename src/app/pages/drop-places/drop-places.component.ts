import {Component, OnInit} from '@angular/core';
import {MainService} from "../../services/main.service";
import {CdkDragDrop, copyArrayItem} from "@angular/cdk/drag-drop";

@Component({
	selector: 'app-drop-places',
	templateUrl: './drop-places.component.html',
	styleUrls: ['./drop-places.component.css']
})
export class DropPlacesComponent implements OnInit{

	playerCards = this.mainService.playerCards;
	idList: any[] = [];
	selectedCards = JSON.parse(JSON.stringify(this.mainService.actualRound.placedCards));
	races = this.mainService.simpleFieldRaces;

	constructor(
		public mainService: MainService
	) {
	}

	ngOnInit(): void {
		//this.selectedCards = JSON.parse(JSON.stringify(this.mainService.actualRound.placedCards));
	}

	onDrop(event: any) {
		if (!event.previousContainer.id.startsWith(event.container.id.substring(0, event.container.id.length - 1))) {
			const cardId = event.item.data.id;
			const cardIndex = this.playerCards.findIndex((card: { id: any; }) => card.id === cardId);
			const dropIndex = Number(event.container.id.match(/(\d)/g));
			this.selectedCards[dropIndex] = this.playerCards[cardIndex];
			this.mainService.actualRound.placedCards[dropIndex] = this.selectedCards[dropIndex];
			//this.selectedCards[dropIndex].cdkDragDisabled = true;
		}
	}
}
