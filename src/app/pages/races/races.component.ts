import {Component, OnInit, ViewChild} from '@angular/core';
import {
	ComplexRace,
	Condition,
	MainService,
	SimpleFieldGreaterWin,
	SimpleFieldLesserWin,
	Surface,
	Track
} from "../../services/main.service";
import {Router} from "@angular/router";

export interface Result {
	opponent: string
	player: string
	winner: string
}

export interface Race {
	opponentCard: any
	playerCard: any
	track: Track | SimpleFieldLesserWin | SimpleFieldGreaterWin
	result?: Result
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
		this.mainService.initResult();
		for (let i = 1; i <= 5; i++) {
			let race: Race = {
				opponentCard: this.mainService.opponentCards[i],
				playerCard: this.mainService.pairedCards[i],
				track: this.mainService.simpleFieldRaces[i],
				result: <Result>{}
			};
			//let race = this.mainService.round.races[i];

			race.result = this.calculateResult(race);
			//console.log(this.mainService.round.races[i]);
			this.races.push(race);
		}
		this.race = this.races[0];
		this.races.shift();
	}

	loadNextRace() {
		if (this.races.length === 0) {
			this.router.navigate(['result']);
		}

		if (this.races.length > 0) {
			this.canLoadNextRace = true;
		}

		if (this.canLoadNextRace) {
			//this.races[0].result = this.calculateResult(this.race);
			this.race = this.races[0];
			this.races.shift();
			this.canLoadNextRace = false;
		}
	}

	calculateResult(race: Race): Result {
		let result: Result = <Result>{};
		console.log(this.mainService.result);
		/*console.log(race.opponentCard.acceleration);
		console.log(race.playerCard.acceleration);*/
		const opponentResult = parseFloat(Math.sqrt((2 * 400) / race.opponentCard.acceleration).toFixed(3));
		const playerResult = parseFloat(Math.sqrt((2 * 400) / race.playerCard.acceleration).toFixed(3));
		if (opponentResult < playerResult) {
			result.winner = 'opponent';
			this.mainService.result.opponent++;
			//console.log(opponentResult + '<' + playerResult + ' => ' + (opponentResult < playerResult));
		} else {
			result.winner = 'player';
			this.mainService.result.player++;
			//console.log(opponentResult + '>' + playerResult + ' => ' + (opponentResult > playerResult));
		}*/

		/*result.player = String(playerResult);
		result.opponent = String(opponentResult);*/
		//console.log(result);
		return result;
	}

	// drawot még le kell kezelni
	calculateSimpleFieldRace(race: Race) {
		let result: Result = <Result>{};
		/*const isLesserWinRace = (Object.values(SimpleFieldLesserWin) as string[]).includes(race.track);
		result.player = race.playerCard.weight;
		result.opponent = race.opponentCard.weight;
		if (isLesserWinRace) {
			if (race.playerCard.weight < race.opponentCard.weight) {
				result.winner = 'player';
				this.mainService.result.player++;
			} else {
				result.winner = 'opponent';
				this.mainService.result.opponent++;
			}
		} else {
			if (race.playerCard.weight > race.opponentCard.weight) {
				result.winner = 'player';
				this.mainService.result.player++;
			} else {
				result.winner = 'opponent';
				this.mainService.result.opponent++;
			}
		}*/
		return result;
	}

	isTrack(object: any) {
		return  object instanceof Object
			&& 'surface' in object
			&& 'condition' in object
			&& 'raceType' in object;
	}

	isSimpleFieldLesserWin(object: any) {
		return (Object.values(SimpleFieldLesserWin) as string[]).includes(object);
	}

	isSimpleFieldGreaterWin(object: any) {
		return (Object.values(SimpleFieldGreaterWin) as string[]).includes(object);
	}

	skipAllRaces() {
		this.router.navigate(['result']);
	}
}
