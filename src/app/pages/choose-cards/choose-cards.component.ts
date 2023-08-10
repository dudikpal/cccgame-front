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
		this.mainService.selectedCard1 = this.dropPlacesComponent.selectedCard1;
		this.mainService.selectedCard2 = this.dropPlacesComponent.selectedCard2;
		this.mainService.selectedCard3 = this.dropPlacesComponent.selectedCard3;
		this.mainService.selectedCard4 = this.dropPlacesComponent.selectedCard4;
		this.mainService.selectedCard5 = this.dropPlacesComponent.selectedCard5;
		this.router.navigate(['/cards-pairing']);
	}
}