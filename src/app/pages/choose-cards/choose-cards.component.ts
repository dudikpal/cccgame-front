import {Component, OnInit, ViewChild} from '@angular/core';
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {PlayerCard} from "../../models/PlayerCard";
import {MatExpansionPanel} from "@angular/material/expansion";
import {MainService} from "../../services/main.service";
import {Router} from "@angular/router";
import {DropPlacesComponent} from "../drop-places/drop-places.component";

@Component({
	selector: 'app-choose-cards',
	templateUrl: './choose-cards.component.html',
	styleUrls: ['./choose-cards.component.css']
})
export class ChooseCardsComponent implements OnInit {
	@ViewChild(DropPlacesComponent) dropPlacesComponent!: DropPlacesComponent;
	isDisabled: boolean = false;

	constructor(
		private mainService: MainService,
		private router: Router
	) {
	}

	ngOnInit(): void {
		this.dropPlacesComponent.selectedCards = this.mainService.actualRound.placedCards;
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
		this.dropPlacesComponent.selectedCards = this.mainService.selectedCards;
	}

	gotoPairing() {
		if (this.mainService.dropPlacesFilled(this.dropPlacesComponent.selectedCards)) {
			this.mainService.selectedCards = this.dropPlacesComponent.selectedCards;
			this.mainService.saveSelectedCardsToDb();
			this.router.navigate(['/cards-pairing']);
		} else {
			alert('Need to select all 5 cards.');
		}
	}

	backToRounds() {
		this.mainService.selectedCards = this.dropPlacesComponent.selectedCards;
		this.mainService.saveSelectedCardsToDb();
		this.router.navigate(['/rounds']);
	}
}