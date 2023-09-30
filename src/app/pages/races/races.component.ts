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
import {PlayerCard} from "../../models/PlayerCard";

export interface Result {
	player: string
	opponent: string
	winner: string
}

export interface Race {
	opponentCard: any
	playerCard: any
	track: Track | SimpleFieldLesserWin | SimpleFieldGreaterWin
	result: Result
}

export interface RaceCards {
	placedCards: any[]
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
			if (i%2 ===0) {
				race.track = this.mainService.tracks[i];
			}
			this.calculateResult(race);
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
		race.result.player = race.playerCard.weight;
		race.result.opponent = race.opponentCard.weight;
		//console.log(race.track);
		if (this.isTrack(race.track)) {
		//	console.log('Is Track!');
		} else if (this.isSimpleFieldLesserWin(race.track)) {
		//	console.log('Is lesser win!');
		} else {
		//	console.log('Is greater win!');
		}
		let result: Result = this.calculateSimpleFieldRace(race);


		/*console.log(race.opponentCard.acceleration);
		console.log(race.playerCard.acceleration);*/

		/*Ez majd a pályás racekhoz kell
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

	private calculateSimpleFieldRace(race: Race) {
		let result: Result = <Result>{};
		const isLesserWinRace = (Object.values(SimpleFieldLesserWin) as string[]).includes(race.track.toString());

		if (isLesserWinRace) {
			this.calculateSimpleFieldLesserWinRace(race);
		} else {
			this.calculateSimpleFieldGreaterWinRace(race);
		}
		return result;
	}

	private calculateSimpleFieldLesserWinRace(race: Race) {
		if (race.playerCard.weight < race.opponentCard.weight) {
			this.setPlayerToWinner(race);
		} else if (race.playerCard.weight > race.opponentCard.weight) {
			this.setOpponentToWinner(race);
		} else {
			this.setDraw(race);
		}
	}

	private calculateSimpleFieldGreaterWinRace(race: Race) {
		if (race.playerCard.weight > race.opponentCard.weight) {
			this.setPlayerToWinner(race);
		} else if (race.playerCard.weight < race.opponentCard.weight) {
			this.setOpponentToWinner(race);
		} else {
			this.setDraw(race);
		}
	}

	private setPlayerToWinner(race: Race) {
		race.result.winner = 'player';
		this.mainService.result.player++;
	}

	private setOpponentToWinner(race: Race) {
		race.result.winner = 'opponent';
		this.mainService.result.opponent++;
	}

	private setDraw(race: Race) {
		race.result.winner = 'draw';
	}

	private isTrack(object: any) {
		return  object instanceof Object
			&& 'surface' in object
			&& 'condition' in object
			&& 'raceType' in object;
	}

	private isSimpleFieldLesserWin(object: any) {
		return (Object.values(SimpleFieldLesserWin) as string[]).includes(object);
	}

	private isSimpleFieldGreaterWin(object: any) {
		return (Object.values(SimpleFieldGreaterWin) as string[]).includes(object);
	}

	skipAllRaces() {
		this.router.navigate(['result']);
	}
}
