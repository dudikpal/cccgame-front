import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {PlayerCard} from "../../models/PlayerCard";
import {MatExpansionPanel} from "@angular/material/expansion";
import {MainService} from "../../services/main.service";

@Component({
	selector: 'app-choose-cards',
	templateUrl: './choose-cards.component.html',
	styleUrls: ['./choose-cards.component.css']
})
export class ChooseCardsComponent implements OnInit {
	selectedCards = this.mainService.playerCards;
	nestedArray = this.mainService.playerCards;
	idList: any[] = [];
	selectedCard1 = this.mainService.selectedCard1;
	selectedCard2 = this.mainService.selectedCard2;
	selectedCard3 = this.mainService.selectedCard3;
	selectedCard4 = this.mainService.selectedCard4;
	selectedCard5 = this.mainService.selectedCard5;
	isDisabled: boolean = false;

	constructor(
		private mainService: MainService
	) {
		console.log('constructorban');
	}

	ngOnInit(): void {
	}

	onDrop(event: CdkDragDrop<any>) {
		const cardId = event.item.data.id;
		const cardName = event.previousContainer.data[event.previousIndex].baseCard.id;
		const card = document.querySelector(`#card_${CSS.escape(cardId)}`);
		card!.classList.add('disabled');
		const cardIndex = this.selectedCards.findIndex((card: { id: any; }) => card.id === cardId);
		copyArrayItem(this.selectedCards,
			event.container.data,
			cardIndex,
			0);
		console.log(event.container.id);
		console.log(cardIndex);
		console.log(this.selectedCard1);
		console.log(this.mainService.selectedCard1);
		console.log(this.selectedCard2);
		console.log(this.mainService.selectedCard2);
		console.log(this.selectedCard3);
		console.log(this.mainService.selectedCard3);
		console.log(this.selectedCard4);
		console.log(this.mainService.selectedCard4);
		console.log(this.selectedCard5);
		console.log(this.mainService.selectedCard5);
	}

	mouseEnterHandler(
		event: MouseEvent,
		chapterExpansionPanel: MatExpansionPanel
	) {
		if (event.buttons && !chapterExpansionPanel.expanded) {
			chapterExpansionPanel.open();
		}
	}

	toggleDisable() {
		this.mainService.toggleDisable();
	}

	rechooseCards() {
		this.mainService.rechooseCards();
	}

	gotoRaces() {
		// navigálni a cars pairing componentbe
	}
}