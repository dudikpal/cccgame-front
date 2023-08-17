import { Component } from '@angular/core';
import {MainService} from "../../services/main.service";

@Component({
	selector: 'app-opponent-hand',
	templateUrl: './opponent-hand.component.html',
	styleUrls: ['./opponent-hand.component.css']
})
export class OpponentHandComponent {

	opponentCards = this.mainService.opponentCards;

	constructor(
		private mainService: MainService
	) {
	}
}
