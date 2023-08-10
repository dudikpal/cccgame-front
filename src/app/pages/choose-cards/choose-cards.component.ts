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

	isDisabled: boolean = false;

	constructor(
		private mainService: MainService
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
	}
}