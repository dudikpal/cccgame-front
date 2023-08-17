import {Component, OnInit, ViewChild} from '@angular/core';
import {MainService} from "../../services/main.service";
import {Router} from "@angular/router";


export interface Race {
	opponentCard: any
	playerCard: any
}

@Component({
	selector: 'app-races',
	templateUrl: './races.component.html',
	styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {

	races: Race[] = [];
	race!: Race;
	canLoadNextRace = false;

	constructor(
		private mainService: MainService,
		private router: Router
	) {
	}

	ngOnInit(): void {
		for (let i = 1; i <= 5; i++) {
			this.races.push({
				opponentCard: this.mainService.opponentCards[i],
				playerCard: this.mainService.pairedCards[i]
			});
		}
		this.race = this.races[0];
		this.races.shift();
	}

	loadNextRace() {
		if (this.races.length === 0) {
			this.router.navigate(['challenges']);
		}
		if (this.races) {
			this.canLoadNextRace = true;
		}
		if (this.canLoadNextRace) {
			this.race = this.races[0];
			this.races.shift();
			this.canLoadNextRace = false;
		}
	}
}
