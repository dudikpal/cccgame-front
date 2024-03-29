import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {BaseCard} from "../models/BaseCard";
import {PlayerCard} from "../models/PlayerCard";
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Environment} from "@angular/cli/lib/config/workspace-schema";
import {Challenge, ChallengeCards} from "../pages/challenges/challenges.component";
import {Race, Result} from "../pages/races/races.component";
import { Round } from '../pages/rounds/rounds.component';

export enum Surface {
	TARMAC = 'Tarmac',
	GRASS = 'Grass',
	DIRT = 'Dirt',
	SAND = 'Sand',
	SNOW = 'Snow',
	ICE = 'Ice',
}

export enum Condition {
	DRY = 'Dry',
	WET = 'Wet',
}

type RaceType = SimpleFieldLesserWin
	| SimpleFieldGreaterWin
	| Track;

export enum ComplexRace {
	DRAG_400M = 'Drag 400m',
	DRAG_1KM = 'Drag 1km',
	DEGREE_450 = '450 degree',
	HILL_CLIMB = 'Hill climb',
	SERPENTIN = 'Serpentin',
	FAST_CIRCUIT = 'Fast circuit',
	SLALOM = 'Slalom',
	GOCART = 'Go-cart track'
}

export enum SimpleFieldLesserWin {
	WEIGHT = 'Weight',
	ACCELERATION = 'Acceleration 0-100 km/h',
	HEIGHT = 'Height',
}

export enum SimpleFieldGreaterWin {
	TOP_SPEED = 'Top speed',
	WIDTH = 'Width',
	POWER_HP = 'Power (HP)',
	CORNERING = 'Cornering'
}

export interface Track {
	surface: Surface,
	condition: Condition,
	raceType: ComplexRace,
}

@Injectable({
	providedIn: 'root'
})
export class MainService {

	public userIsLoggedIn = false;
	public isLoading = false;
//  playerCardSkeleton!: PlayerCard;
	playerCardSkeleton = {
		baseCard: {
			imageUrl: "assets/img/placeholder.jpg"
		}
	};
	/*selectedCard1: any = this.playerCardSkeleton;
	selectedCard2: any = this.playerCardSkeleton;
	selectedCard3: any = this.playerCardSkeleton;
	selectedCard4: any = this.playerCardSkeleton;
	selectedCard5: any = this.playerCardSkeleton;*/
	selectedCards: {[key: string]: any} = {
	  /*1 : this.playerCardSkeleton,
	  2 : this.playerCardSkeleton,
	  3 : this.playerCardSkeleton,
	  4 : this.playerCardSkeleton,
	  5 : this.playerCardSkeleton,*/
		1: JSON.parse('{"id":"64837db4a4606e7e46c81954","baseCard":{"id":"c_2001_rover-75-tourer-2.0-v6-150hp-11650","rq":0,"tags":null,"level":null,"manufacturer":"Rover","type":"75 2.0 V6","country":"N/A","body":"Estate","driveWheel":"FWD","fuelType":"Petrol","abs":"yes","tractionControl":"N/A","imageUrl":"assets/img/cars/rover-75-tourer-2.0-v6-150hp-11650.webp","logoURL":"placeholder.png","carPageUrl":"https://www.auto-data.net/en/rover-75-tourer-2.0-v6-150hp-11650","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":2001,"doors":5,"cornering":71,"seats":5,"fuelTankCapacity":65,"engineCapacity":1997,"powerKW":111,"powerHP":150,"maxTorque":185,"topSpeed":201,"weight":1505,"length":4792,"width":1778,"height":1424,"groundClearance":-1,"acceleration":10.2,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.616,"updatedAt":1685308533.616,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":1505,"topSpeed":201,"acceleration":10.2,"powerHP":150,"width":1778,"height":1424,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.61,"updatedAt":1686338996.61}'),
		2: JSON.parse('{"id":"64837db4a4606e7e46c81951","baseCard":{"id":"c_1993_fiat-coupe-fa-175-2.0-20v-154hp-7278","rq":0,"tags":null,"level":null,"manufacturer":"Fiat","type":"Coupe 2.0 20V","country":"N/A","body":"Coupe","driveWheel":"FWD","fuelType":"Petrol","abs":"yes","tractionControl":"N/A","imageUrl":"assets/img/cars/fiat-coupe-fa-175-2.0-20v-154hp-7278.webp","logoURL":"placeholder.png","carPageUrl":"https://www.auto-data.net/en/fiat-coupe-fa-175-2.0-20v-154hp-7278","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":1993,"doors":2,"cornering":71,"seats":4,"fuelTankCapacity":63,"engineCapacity":1998,"powerKW":114,"powerHP":154,"maxTorque":186,"topSpeed":215,"weight":1270,"length":4250,"width":1768,"height":1355,"groundClearance":-1,"acceleration":8.4,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.54,"updatedAt":1685308533.545,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":1270,"topSpeed":215,"acceleration":8.4,"powerHP":154,"width":1768,"height":1355,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.55,"updatedAt":1686338996.55}'),
		3: JSON.parse('{"id":"64837db4a4606e7e46c81955","baseCard":{"id":"c_1955_bmw-isetta-250-12hp-44635","rq":0,"tags":null,"level":null,"manufacturer":"BMW","type":"Isetta 250","country":"N/A","body":"Quadricycle","driveWheel":"RWD","fuelType":"Petrol","abs":"N/A","tractionControl":"N/A","imageUrl":"assets/img/cars/bmw-isetta-250-12hp-44635.webp","logoURL":"placeholder.png","carPageUrl":"https://www.auto-data.net/en/bmw-isetta-250-12hp-44635","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":1955,"doors":1,"cornering":71,"seats":2,"fuelTankCapacity":13,"engineCapacity":245,"powerKW":8,"powerHP":12,"maxTorque":14,"topSpeed":85,"weight":370,"length":2355,"width":1380,"height":1340,"groundClearance":-1,"acceleration":16.8,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.625,"updatedAt":1685308533.626,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":370,"topSpeed":85,"acceleration":16.8,"powerHP":12,"width":1380,"height":1340,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.614,"updatedAt":1686338996.614}'),
		4: JSON.parse('{"id":"64837db4a4606e7e46c81953","baseCard":{"id":"c_1976_lotus-esprit-2.2-i-turbo-231hp-8302","rq":0,"tags":null,"level":null,"manufacturer":"Lotus","type":"Esprit 2.2 i Turbo","country":"N/A","body":"Coupe","driveWheel":"RWD","fuelType":"Petrol","abs":"yes","tractionControl":"N/A","imageUrl":"assets/img/cars/lotus-esprit-2.2-i-turbo-231hp-8302.webp","logoURL":"placeholder.png","carPageUrl":"https://www.auto-data.net/en/lotus-esprit-2.2-i-turbo-231hp-8302","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":1976,"doors":2,"cornering":71,"seats":2,"fuelTankCapacity":73,"engineCapacity":2174,"powerKW":172,"powerHP":231,"maxTorque":295,"topSpeed":250,"weight":1270,"length":4330,"width":1860,"height":1150,"groundClearance":-1,"acceleration":5.5,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.606,"updatedAt":1685308533.606,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":1270,"topSpeed":250,"acceleration":5.5,"powerHP":231,"width":1860,"height":1150,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.605,"updatedAt":1686338996.605}'),
		5: JSON.parse('{"id":"64837db4a4606e7e46c81952","baseCard":{"id":"c_2021_cupra-leon-2.0-tsi-evo-300hp-dsg-42357","rq":0,"tags":null,"level":null,"manufacturer":"Cupra","type":"Leon 2.0 TSI EVO","country":"N/A","body":"Hatchback","driveWheel":"FWD","fuelType":"Petrol","abs":"yes","tractionControl":"N/A","imageUrl":"assets/img/cars/cupra-leon-2.0-tsi-evo-300hp-dsg-42357.webp","logoURL":"placeholder.png","carPageUrl":"https://www.auto-data.net/en/cupra-leon-2.0-tsi-evo-300hp-dsg-42357","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":2021,"doors":5,"cornering":71,"seats":5,"fuelTankCapacity":50,"engineCapacity":1984,"powerKW":223,"powerHP":300,"maxTorque":400,"topSpeed":250,"weight":1490,"length":4398,"width":1799,"height":1442,"groundClearance":-1,"acceleration":5.7,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.595,"updatedAt":1685308533.595,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":1490,"topSpeed":250,"acceleration":5.7,"powerHP":300,"width":1799,"height":1442,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.602,"updatedAt":1686338996.602}'),

	};
	pairedCard1: any = this.playerCardSkeleton;
	pairedCard2: any = this.playerCardSkeleton;
	pairedCard3: any = this.playerCardSkeleton;
	pairedCard4: any = this.playerCardSkeleton;
	pairedCard5: any = this.playerCardSkeleton;
	pairedCards: { [key: string]: any } = {
		1: this.playerCardSkeleton,
		2: this.playerCardSkeleton,
		3: this.playerCardSkeleton,
		4: this.playerCardSkeleton,
		5: this.playerCardSkeleton,
	};
	opponentCards: { [key: string]: any } = {
		1: JSON.parse('{"id":"64837db4a4606e7e46c81951","baseCard":{"id":"c_1993_fiat-coupe-fa-175-2.0-20v-154hp-7278","rq":0,"tags":null,"level":null,"manufacturer":"Fiat","type":"Coupe 2.0 20V","country":"N/A","body":"Coupe","driveWheel":"FWD","fuelType":"Petrol","abs":"yes","tractionControl":"N/A","imageUrl":"assets/img/cars/fiat-coupe-fa-175-2.0-20v-154hp-7278.webp","logoURL":"placeholder.png","carPageUrl":"https://www.auto-data.net/en/fiat-coupe-fa-175-2.0-20v-154hp-7278","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":1993,"doors":2,"cornering":71,"seats":4,"fuelTankCapacity":63,"engineCapacity":1998,"powerKW":114,"powerHP":154,"maxTorque":186,"topSpeed":215,"weight":1270,"length":4250,"width":1768,"height":1355,"groundClearance":-1,"acceleration":8.4,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.54,"updatedAt":1685308533.545,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":1270,"topSpeed":215,"acceleration":8.4,"powerHP":154,"width":1768,"height":1355,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.55,"updatedAt":1686338996.55}'),
		2: JSON.parse('{"id":"64837db4a4606e7e46c81952","baseCard":{"id":"c_2021_cupra-leon-2.0-tsi-evo-300hp-dsg-42357","rq":0,"tags":null,"level":null,"manufacturer":"Cupra","type":"Leon 2.0 TSI EVO","country":"N/A","body":"Hatchback","driveWheel":"FWD","fuelType":"Petrol","abs":"yes","tractionControl":"N/A","imageUrl":"assets/img/cars/cupra-leon-2.0-tsi-evo-300hp-dsg-42357.webp","logoURL":"placeholder.png","carPageUrl":"https://www.auto-data.net/en/cupra-leon-2.0-tsi-evo-300hp-dsg-42357","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":2021,"doors":5,"cornering":71,"seats":5,"fuelTankCapacity":50,"engineCapacity":1984,"powerKW":223,"powerHP":300,"maxTorque":400,"topSpeed":250,"weight":1490,"length":4398,"width":1799,"height":1442,"groundClearance":-1,"acceleration":5.7,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.595,"updatedAt":1685308533.595,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":1490,"topSpeed":250,"acceleration":5.7,"powerHP":300,"width":1799,"height":1442,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.602,"updatedAt":1686338996.602}'),
		3: JSON.parse('{"id":"64837db4a4606e7e46c81953","baseCard":{"id":"c_1976_lotus-esprit-2.2-i-turbo-231hp-8302","rq":0,"tags":null,"level":null,"manufacturer":"Lotus","type":"Esprit 2.2 i Turbo","country":"N/A","body":"Coupe","driveWheel":"RWD","fuelType":"Petrol","abs":"yes","tractionControl":"N/A","imageUrl":"assets/img/cars/lotus-esprit-2.2-i-turbo-231hp-8302.webp","logoURL":"placeholder.png","carPageUrl":"https://www.auto-data.net/en/lotus-esprit-2.2-i-turbo-231hp-8302","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":1976,"doors":2,"cornering":71,"seats":2,"fuelTankCapacity":73,"engineCapacity":2174,"powerKW":172,"powerHP":231,"maxTorque":295,"topSpeed":250,"weight":1270,"length":4330,"width":1860,"height":1150,"groundClearance":-1,"acceleration":5.5,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.606,"updatedAt":1685308533.606,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":1270,"topSpeed":250,"acceleration":5.5,"powerHP":231,"width":1860,"height":1150,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.605,"updatedAt":1686338996.605}'),
		4: JSON.parse('{"id":"64837db4a4606e7e46c81954","baseCard":{"id":"c_2001_rover-75-tourer-2.0-v6-150hp-11650","rq":0,"tags":null,"level":null,"manufacturer":"Rover","type":"75 2.0 V6","country":"N/A","body":"Estate","driveWheel":"FWD","fuelType":"Petrol","abs":"yes","tractionControl":"N/A","imageUrl":"assets/img/cars/rover-75-tourer-2.0-v6-150hp-11650.webp","logoURL":"placeholder.png","carPageUrl":"https://www.auto-data.net/en/rover-75-tourer-2.0-v6-150hp-11650","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":2001,"doors":5,"cornering":71,"seats":5,"fuelTankCapacity":65,"engineCapacity":1997,"powerKW":111,"powerHP":150,"maxTorque":185,"topSpeed":201,"weight":1505,"length":4792,"width":1778,"height":1424,"groundClearance":-1,"acceleration":10.2,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.616,"updatedAt":1685308533.616,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":1505,"topSpeed":201,"acceleration":10.2,"powerHP":150,"width":1778,"height":1424,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.61,"updatedAt":1686338996.61}'),
		5: JSON.parse('{"id":"64837db4a4606e7e46c81955","baseCard":{"id":"c_1955_bmw-isetta-250-12hp-44635","rq":0,"tags":null,"level":null,"manufacturer":"BMW","type":"Isetta 250","country":"N/A","body":"Quadricycle","driveWheel":"RWD","fuelType":"Petrol","abs":"N/A","tractionControl":"N/A","imageUrl":"assets/img/cars/bmw-isetta-250-12hp-44635.webp","logoURL":"placeholder.png","carPageUrl":"https://www.auto-data.net/en/bmw-isetta-250-12hp-44635","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":1955,"doors":1,"cornering":71,"seats":2,"fuelTankCapacity":13,"engineCapacity":245,"powerKW":8,"powerHP":12,"maxTorque":14,"topSpeed":85,"weight":370,"length":2355,"width":1380,"height":1340,"groundClearance":-1,"acceleration":16.8,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.625,"updatedAt":1685308533.626,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":370,"topSpeed":85,"acceleration":16.8,"powerHP":12,"width":1380,"height":1340,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.614,"updatedAt":1686338996.614}'),
	};

	simpleFieldRaces: {[key: string]: SimpleFieldLesserWin | SimpleFieldGreaterWin} = {
		1: SimpleFieldGreaterWin.POWER_HP,
		2: SimpleFieldGreaterWin.TOP_SPEED,
		3: SimpleFieldGreaterWin.WIDTH,
		4: SimpleFieldLesserWin.ACCELERATION,
		5: SimpleFieldLesserWin.WEIGHT,
	};

	tracks: { [key: string]: Track } = {
		1: {
			surface: Surface.TARMAC,
			condition: Condition.DRY,
			raceType: ComplexRace.DEGREE_450
		},
		2: {
			surface: Surface.TARMAC,
			condition: Condition.DRY,
			raceType: ComplexRace.DRAG_400M
		},
		3: {
			surface: Surface.TARMAC,
			condition: Condition.WET,
			raceType: ComplexRace.DEGREE_450
		},
		4: {
			surface: Surface.TARMAC,
			condition: Condition.DRY,
			raceType: ComplexRace.HILL_CLIMB
		},
		5: {
			surface: Surface.ICE,
			condition: Condition.DRY,
			raceType: ComplexRace.DRAG_400M
		}
	};
	result = {
		player: 0,
		opponent: 0
	};

	challenges: Challenge[] = [
		{
			name: "Let's begin",
			rounds: [
				{
					order: 1,
					races: [],
					placedCards: {
						1: this.playerCardSkeleton,
						2: this.playerCardSkeleton,
						3: this.playerCardSkeleton,
						4: this.playerCardSkeleton,
						5: this.playerCardSkeleton,
					},
					done: false
				},
				{
					order: 2,
					races: [],
					placedCards: {
						1: this.playerCardSkeleton,
						2: this.playerCardSkeleton,
						3: this.playerCardSkeleton,
						4: this.playerCardSkeleton,
						5: this.playerCardSkeleton,
					},
					done: false
				},
				{
					order: 3,
					races: [],
					placedCards: {
						1: this.playerCardSkeleton,
						2: this.playerCardSkeleton,
						3: this.playerCardSkeleton,
						4: this.playerCardSkeleton,
						5: this.playerCardSkeleton,
					},
					done: false
				},
				{
					order: 4,
					races: [],
					placedCards: {
						1: this.playerCardSkeleton,
						2: this.playerCardSkeleton,
						3: this.playerCardSkeleton,
						4: this.playerCardSkeleton,
						5: this.playerCardSkeleton,
					},
					done: false
				},
				{
					order: 5,
					races: [],
					placedCards: {
						1: this.playerCardSkeleton,
						2: this.playerCardSkeleton,
						3: this.playerCardSkeleton,
						4: this.playerCardSkeleton,
						5: this.playerCardSkeleton,
					},
					done: false
				},
				{
					order: 6,
					races: [],
					placedCards: {
						1: this.playerCardSkeleton,
						2: this.playerCardSkeleton,
						3: this.playerCardSkeleton,
						4: this.playerCardSkeleton,
						5: this.playerCardSkeleton,
					},
					done: false
				}
			]
		}
	];

	playerCards!: PlayerCard[];
	/*playerCards = JSON.parse(
		'[{"id":"64837db4a4606e7e46c81951","baseCard":{"id":"c_1993_fiat-coupe-fa-175-2.0-20v-154hp-7278","rq":0,"tags":null,"level":null,"manufacturer":"Fiat","type":"Coupe 2.0 20V","country":"N/A","body":"Coupe","driveWheel":"FWD","fuelType":"Petrol","abs":"yes","tractionControl":"N/A","imageUrl":"assets/img/cars/fiat-coupe-fa-175-2.0-20v-154hp-7278.webp","logoURL":"placeholder.png","carPageUrl":"https://www.auto-data.net/en/fiat-coupe-fa-175-2.0-20v-154hp-7278","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":1993,"doors":2,"cornering":71,"seats":4,"fuelTankCapacity":63,"engineCapacity":1998,"powerKW":114,"powerHP":154,"maxTorque":186,"topSpeed":215,"weight":1270,"length":4250,"width":1768,"height":1355,"groundClearance":-1,"acceleration":8.4,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.54,"updatedAt":1685308533.545,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":1270,"topSpeed":215,"acceleration":8.4,"powerHP":154,"width":1768,"height":1355,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.55,"updatedAt":1686338996.55},{"id":"64837db4a4606e7e46c81952","baseCard":{"id":"c_2021_cupra-leon-2.0-tsi-evo-300hp-dsg-42357","rq":0,"tags":null,"level":null,"manufacturer":"Cupra","type":"Leon 2.0 TSI EVO","country":"N/A","body":"Hatchback","driveWheel":"FWD","fuelType":"Petrol","abs":"yes","tractionControl":"N/A","imageUrl":"assets/img/cars/cupra-leon-2.0-tsi-evo-300hp-dsg-42357.webp","logoURL":"placeholder.png","carPageUrl":"https://www.auto-data.net/en/cupra-leon-2.0-tsi-evo-300hp-dsg-42357","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":2021,"doors":5,"cornering":71,"seats":5,"fuelTankCapacity":50,"engineCapacity":1984,"powerKW":223,"powerHP":300,"maxTorque":400,"topSpeed":250,"weight":1490,"length":4398,"width":1799,"height":1442,"groundClearance":-1,"acceleration":5.7,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.595,"updatedAt":1685308533.595,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":1490,"topSpeed":250,"acceleration":5.7,"powerHP":300,"width":1799,"height":1442,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.602,"updatedAt":1686338996.602},{"id":"64837db4a4606e7e46c81953","baseCard":{"id":"c_1976_lotus-esprit-2.2-i-turbo-231hp-8302","rq":0,"tags":null,"level":null,"manufacturer":"Lotus","type":"Esprit 2.2 i Turbo","country":"N/A","body":"Coupe","driveWheel":"RWD","fuelType":"Petrol","abs":"yes","tractionControl":"N/A","imageUrl":"assets/img/cars/lotus-esprit-2.2-i-turbo-231hp-8302.webp","logoURL":"placeholder.png","carPageUrl":"https://www.auto-data.net/en/lotus-esprit-2.2-i-turbo-231hp-8302","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":1976,"doors":2,"cornering":71,"seats":2,"fuelTankCapacity":73,"engineCapacity":2174,"powerKW":172,"powerHP":231,"maxTorque":295,"topSpeed":250,"weight":1270,"length":4330,"width":1860,"height":1150,"groundClearance":-1,"acceleration":5.5,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.606,"updatedAt":1685308533.606,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":1270,"topSpeed":250,"acceleration":5.5,"powerHP":231,"width":1860,"height":1150,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.605,"updatedAt":1686338996.605},{"id":"64837db4a4606e7e46c81954","baseCard":{"id":"c_2001_rover-75-tourer-2.0-v6-150hp-11650","rq":0,"tags":null,"level":null,"manufacturer":"Rover","type":"75 2.0 V6","country":"N/A","body":"Estate","driveWheel":"FWD","fuelType":"Petrol","abs":"yes","tractionControl":"N/A","imageUrl":"assets/img/cars/rover-75-tourer-2.0-v6-150hp-11650.webp","logoURL":"placeholder.png","carPageUrl":"https://www.auto-data.net/en/rover-75-tourer-2.0-v6-150hp-11650","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":2001,"doors":5,"cornering":71,"seats":5,"fuelTankCapacity":65,"engineCapacity":1997,"powerKW":111,"powerHP":150,"maxTorque":185,"topSpeed":201,"weight":1505,"length":4792,"width":1778,"height":1424,"groundClearance":-1,"acceleration":10.2,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.616,"updatedAt":1685308533.616,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":1505,"topSpeed":201,"acceleration":10.2,"powerHP":150,"width":1778,"height":1424,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.61,"updatedAt":1686338996.61},{"id":"64837db4a4606e7e46c81955","baseCard":{"id":"c_1955_bmw-isetta-250-12hp-44635","rq":0,"tags":null,"level":null,"manufacturer":"BMW","type":"Isetta 250","country":"N/A","body":"Quadricycle","driveWheel":"RWD","fuelType":"Petrol","abs":"N/A","tractionControl":"N/A","imageUrl":"assets/img/cars/bmw-isetta-250-12hp-44635.webp","logoURL":"placeholder.png","carPageUrl":"https://www.auto-data.net/en/bmw-isetta-250-12hp-44635","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":1955,"doors":1,"cornering":71,"seats":2,"fuelTankCapacity":13,"engineCapacity":245,"powerKW":8,"powerHP":12,"maxTorque":14,"topSpeed":85,"weight":370,"length":2355,"width":1380,"height":1340,"groundClearance":-1,"acceleration":-1,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.625,"updatedAt":1685308533.626,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":370,"topSpeed":85,"acceleration":-1,"powerHP":12,"width":1380,"height":1340,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.614,"updatedAt":1686338996.614},{"id":"64837db4a4606e7e46c81956","baseCard":{"id":"c_1995_lincoln-continental_59792","rq":0,"tags":null,"level":null,"manufacturer":"Lincoln","type":"Continental","country":"N/A","body":"Sedan","driveWheel":"FWD","fuelType":"gasoline","abs":"yes","tractionControl":"N/A","imageUrl":"assets/img/cars/lincoln-continental_59792.webp","logoURL":"placeholder.png","carPageUrl":"https://www.cars-data.com/en/lincoln-continental-specs/59792","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":1995,"doors":4,"cornering":71,"seats":5,"fuelTankCapacity":67,"engineCapacity":4603,"powerKW":194,"powerHP":264,"maxTorque":359,"topSpeed":-1,"weight":1760,"length":5240,"width":1870,"height":1420,"groundClearance":-1,"acceleration":-1,"gear1st":2.77,"gear2nd":1.54,"gear3rd":1,"gear4th":0.69,"gear5th":-1,"gear6th":-1,"finalDrive":3.56,"createdAt":1685308533.638,"updatedAt":1685308533.639,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":1760,"topSpeed":-1,"acceleration":-1,"powerHP":264,"width":1870,"height":1420,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.618,"updatedAt":1686338996.618},{"id":"64837db4a4606e7e46c81957","baseCard":{"id":"c_1992_mercury-sable-stationwagon-ls_59813","rq":0,"tags":null,"level":null,"manufacturer":"Mercury","type":"Sable Stationwagon LS","country":"N/A","body":"Estate","driveWheel":"FWD","fuelType":"gasoline","abs":"yes","tractionControl":"N/A","imageUrl":"assets/img/cars/mercury-sable-stationwagon-ls_59813.webp","logoURL":"placeholder.png","carPageUrl":"https://www.cars-data.com/en/mercury-sable-stationwagon-ls-specs/59813","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":1992,"doors":5,"cornering":71,"seats":5,"fuelTankCapacity":61,"engineCapacity":3797,"powerKW":104,"powerHP":141,"maxTorque":292,"topSpeed":180,"weight":1580,"length":4910,"width":1810,"height":1400,"groundClearance":-1,"acceleration":-1,"gear1st":2.77,"gear2nd":1.54,"gear3rd":1,"gear4th":0.69,"gear5th":-1,"gear6th":-1,"finalDrive":3.37,"createdAt":1685308533.661,"updatedAt":1685308533.661,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":1580,"topSpeed":180,"acceleration":-1,"powerHP":141,"width":1810,"height":1400,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.621,"updatedAt":1686338996.621},{"id":"64837db4a4606e7e46c81958","baseCard":{"id":"c_2005_suzuki-swift-1-5-gls_47270","rq":0,"tags":null,"level":null,"manufacturer":"Suzuki","type":"Swift 1.5 GLS","country":"N/A","body":"Hatchback","driveWheel":"FWD","fuelType":"gasoline","abs":"yes","tractionControl":"N/A","imageUrl":"assets/img/cars/suzuki-swift-1-5-gls_47270.webp","logoURL":"placeholder.png","carPageUrl":"https://www.cars-data.com/en/suzuki-swift-1-5-gls-specs/47270","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":2005,"doors":5,"cornering":71,"seats":5,"fuelTankCapacity":45,"engineCapacity":1490,"powerKW":75,"powerHP":102,"maxTorque":133,"topSpeed":185,"weight":975,"length":3695,"width":1690,"height":1500,"groundClearance":-1,"acceleration":10,"gear1st":3.55,"gear2nd":1.9,"gear3rd":1.31,"gear4th":0.97,"gear5th":0.77,"gear6th":-1,"finalDrive":4.11,"createdAt":1685308533.681,"updatedAt":1685308533.681,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":975,"topSpeed":185,"acceleration":10,"powerHP":102,"width":1690,"height":1500,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.63,"updatedAt":1686338996.63},{"id":"64837db4a4606e7e46c81959","baseCard":{"id":"c_2017_audi-a8-55-tfsi-quattro_80368","rq":0,"tags":null,"level":null,"manufacturer":"Audi","type":"A8 55 TFSI quattro","country":"N/A","body":"Sedan","driveWheel":"AWD","fuelType":"gasoline","abs":"yes","tractionControl":"yes","imageUrl":"assets/img/cars/audi-a8-55-tfsi-quattro_80368.webp","logoURL":"placeholder.png","carPageUrl":"https://www.cars-data.com/en/audi-a8-55-tfsi-quattro-specs/80368","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":2017,"doors":4,"cornering":71,"seats":5,"fuelTankCapacity":72,"engineCapacity":2995,"powerKW":250,"powerHP":340,"maxTorque":500,"topSpeed":250,"weight":1895,"length":5172,"width":1945,"height":1473,"groundClearance":-1,"acceleration":5.6,"gear1st":4.71,"gear2nd":3.14,"gear3rd":2.11,"gear4th":1.67,"gear5th":1.29,"gear6th":1,"finalDrive":3.08,"createdAt":1685308533.701,"updatedAt":1685308533.701,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":1895,"topSpeed":250,"acceleration":5.6,"powerHP":340,"width":1945,"height":1473,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.633,"updatedAt":1686338996.633},{"id":"64837db4a4606e7e46c8195a","baseCard":{"id":"c_2002_suzuki-liana-1-6-glx_47096","rq":0,"tags":null,"level":null,"manufacturer":"Suzuki","type":"Liana 1.6 GLX","country":"N/A","body":"Sedan","driveWheel":"FWD","fuelType":"gasoline","abs":"yes","tractionControl":"N/A","imageUrl":"assets/img/cars/suzuki-liana-1-6-glx_47096.webp","logoURL":"placeholder.png","carPageUrl":"https://www.cars-data.com/en/suzuki-liana-1-6-glx-specs/47096","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":2002,"doors":4,"cornering":71,"seats":5,"fuelTankCapacity":50,"engineCapacity":1586,"powerKW":76,"powerHP":103,"maxTorque":144,"topSpeed":170,"weight":1110,"length":4350,"width":1690,"height":1545,"groundClearance":160,"acceleration":-1,"gear1st":3.55,"gear2nd":1.9,"gear3rd":1.31,"gear4th":0.97,"gear5th":0.82,"gear6th":-1,"finalDrive":4.11,"createdAt":1685308533.714,"updatedAt":1685308533.714,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":1110,"topSpeed":170,"acceleration":-1,"powerHP":103,"width":1690,"height":1545,"cornering":71,"groundClearance":160,"win":null,"loss":null,"value":null,"createdAt":1686338996.637,"updatedAt":1686338996.637},{"id":"64837db4a4606e7e46c8195b","baseCard":{"id":"c_2018_aston-martin-vantage_79941","rq":0,"tags":null,"level":null,"manufacturer":"Aston Martin","type":"Vantage","country":"N/A","body":"Coupe","driveWheel":"RWD","fuelType":"gasoline","abs":"yes","tractionControl":"yes","imageUrl":"assets/img/cars/aston-martin-vantage_79941.webp","logoURL":"placeholder.png","carPageUrl":"https://www.cars-data.com/en/aston-martin-vantage-specs/79941","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":2018,"doors":2,"cornering":71,"seats":2,"fuelTankCapacity":73,"engineCapacity":4000,"powerKW":375,"powerHP":510,"maxTorque":685,"topSpeed":314,"weight":1530,"length":4465,"width":1942,"height":1273,"groundClearance":-1,"acceleration":3.6,"gear1st":4.71,"gear2nd":3.14,"gear3rd":2.11,"gear4th":1.67,"gear5th":1.28,"gear6th":1,"finalDrive":2.93,"createdAt":1685308533.727,"updatedAt":1685308533.727,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":1530,"topSpeed":314,"acceleration":3.6,"powerHP":510,"width":1942,"height":1273,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.642,"updatedAt":1686338996.642},{"id":"64837db4a4606e7e46c8195c","baseCard":{"id":"c_1992_buick_park-avenue_36","rq":0,"tags":null,"level":null,"manufacturer":"Buick","type":"Park Avenue Ultra V6 Supercharger","country":"N/A","body":"Sedan","driveWheel":"FWD","fuelType":"N/A","abs":"N/A","tractionControl":"N/A","imageUrl":"assets/img/cars/1992_buick_park-avenue_36.webp","logoURL":"placeholder.png","carPageUrl":"https://www.carspecs.us/cars/1992/buick/park-avenue/36","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":1992,"doors":-1,"cornering":0,"seats":-1,"fuelTankCapacity":68,"engineCapacity":3800,"powerKW":152,"powerHP":205,"maxTorque":352,"topSpeed":-1,"weight":-1,"length":5207,"width":73,"height":55,"groundClearance":127,"acceleration":8.41,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.748,"updatedAt":1685308533.748,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":-1,"topSpeed":-1,"acceleration":8.41,"powerHP":205,"width":73,"height":55,"cornering":0,"groundClearance":127,"win":null,"loss":null,"value":null,"createdAt":1686338996.645,"updatedAt":1686338996.645},{"id":"64837db4a4606e7e46c8195d","baseCard":{"id":"c_2007_audi_a4_71215","rq":0,"tags":null,"level":null,"manufacturer":"Audi","type":"A4 2.0T","country":"N/A","body":"Sedan","driveWheel":"FWD","fuelType":"N/A","abs":"yes","tractionControl":"N/A","imageUrl":"assets/img/cars/2007_audi_a4_71215.webp","logoURL":"placeholder.png","carPageUrl":"https://www.carspecs.us/cars/2007/audi/a4/71215","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":2007,"doors":4,"cornering":0,"seats":5,"fuelTankCapacity":70,"engineCapacity":2000,"powerKW":149,"powerHP":200,"maxTorque":280,"topSpeed":-1,"weight":-1,"length":4572,"width":69,"height":56,"groundClearance":101,"acceleration":7.58,"gear1st":3.67,"gear2nd":2.05,"gear3rd":1.37,"gear4th":1.03,"gear5th":0.8,"gear6th":0.66,"finalDrive":3.75,"createdAt":1685308533.777,"updatedAt":1685308533.777,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":-1,"topSpeed":-1,"acceleration":7.58,"powerHP":200,"width":69,"height":56,"cornering":0,"groundClearance":101,"win":null,"loss":null,"value":null,"createdAt":1686338996.648,"updatedAt":1686338996.648},{"id":"64837db4a4606e7e46c8195e","baseCard":{"id":"c_2014_dodge_avenger_35821","rq":0,"tags":null,"level":null,"manufacturer":"Dodge","type":"Avenger V6","country":"N/A","body":"Sedan","driveWheel":"FWD","fuelType":"N/A","abs":"yes","tractionControl":"yes","imageUrl":"assets/img/cars/2014_dodge_avenger_35821.webp","logoURL":"placeholder.png","carPageUrl":"https://www.carspecs.us/cars/2014/dodge/avenger/35821","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":2014,"doors":-1,"cornering":0,"seats":-1,"fuelTankCapacity":63,"engineCapacity":3600,"powerKW":211,"powerHP":283,"maxTorque":352,"topSpeed":-1,"weight":-1,"length":4876,"width":72,"height":58,"groundClearance":152,"acceleration":6.56,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.794,"updatedAt":1685308533.794,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":-1,"topSpeed":-1,"acceleration":6.56,"powerHP":283,"width":72,"height":58,"cornering":0,"groundClearance":152,"win":null,"loss":null,"value":null,"createdAt":1686338996.651,"updatedAt":1686338996.651},{"id":"64837db4a4606e7e46c8195f","baseCard":{"id":"c_1991_volvo_940_36963","rq":0,"tags":null,"level":null,"manufacturer":"Volvo","type":"940 SE Turbo","country":"N/A","body":"Sedan","driveWheel":"RWD","fuelType":"N/A","abs":"N/A","tractionControl":"N/A","imageUrl":"assets/img/cars/1991_volvo_940_36963.webp","logoURL":"placeholder.png","carPageUrl":"https://www.carspecs.us/cars/1991/volvo/940/36963","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":1991,"doors":-1,"cornering":0,"seats":-1,"fuelTankCapacity":79,"engineCapacity":2300,"powerKW":120,"powerHP":162,"maxTorque":264,"topSpeed":-1,"weight":-1,"length":4851,"width":69,"height":55,"groundClearance":101,"acceleration":8.62,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.815,"updatedAt":1685308533.815,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":-1,"topSpeed":-1,"acceleration":8.62,"powerHP":162,"width":69,"height":55,"cornering":0,"groundClearance":101,"win":null,"loss":null,"value":null,"createdAt":1686338996.655,"updatedAt":1686338996.655},{"id":"64837db4a4606e7e46c81960","baseCard":{"id":"c_1999_oldsmobile_aurora_7802","rq":0,"tags":null,"level":null,"manufacturer":"Oldsmobile","type":"Aurora V8","country":"N/A","body":"Sedan","driveWheel":"FWD","fuelType":"N/A","abs":"yes","tractionControl":"N/A","imageUrl":"assets/img/cars/1999_oldsmobile_aurora_7802.webp","logoURL":"placeholder.png","carPageUrl":"https://www.carspecs.us/cars/1999/oldsmobile/aurora/7802","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":1999,"doors":4,"cornering":0,"seats":5,"fuelTankCapacity":70,"engineCapacity":4000,"powerKW":186,"powerHP":250,"maxTorque":352,"topSpeed":-1,"weight":-1,"length":5207,"width":74,"height":55,"groundClearance":127,"acceleration":7.63,"gear1st":2.96,"gear2nd":1.63,"gear3rd":1,"gear4th":0.68,"gear5th":-1,"gear6th":-1,"finalDrive":3.48,"createdAt":1685308533.838,"updatedAt":1685308533.838,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":-1,"topSpeed":-1,"acceleration":7.63,"powerHP":250,"width":74,"height":55,"cornering":0,"groundClearance":127,"win":null,"loss":null,"value":null,"createdAt":1686338996.658,"updatedAt":1686338996.658},{"id":"64837db4a4606e7e46c81961","baseCard":{"id":"c_2015_bentley_continental-gt3-r_44722","rq":0,"tags":null,"level":null,"manufacturer":"Bentley","type":"Continental GT3-R V8 Twin turbo","country":"N/A","body":"Coupe","driveWheel":"AWD","fuelType":"N/A","abs":"N/A","tractionControl":"yes","imageUrl":"assets/img/cars/2015_bentley_continental-gt3-r_44722.webp","logoURL":"placeholder.png","carPageUrl":"https://www.carspecs.us/cars/2015/bentley/continental-gt3-r/44722","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":2015,"doors":-1,"cornering":0,"seats":-1,"fuelTankCapacity":90,"engineCapacity":4000,"powerKW":426,"powerHP":572,"maxTorque":702,"topSpeed":-1,"weight":-1,"length":4800,"width":76,"height":55,"groundClearance":-25,"acceleration":4.27,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.855,"updatedAt":1685308533.855,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":-1,"topSpeed":-1,"acceleration":4.27,"powerHP":572,"width":76,"height":55,"cornering":0,"groundClearance":-25,"win":null,"loss":null,"value":null,"createdAt":1686338996.662,"updatedAt":1686338996.662},{"id":"64837db4a4606e7e46c81962","baseCard":{"id":"c_2003_aston-martin_db7-vantage_12032","rq":0,"tags":null,"level":null,"manufacturer":"Aston Martin","type":"DB7 Vantage Volante","country":"N/A","body":"Convertible","driveWheel":"RWD","fuelType":"N/A","abs":"N/A","tractionControl":"N/A","imageUrl":"assets/img/cars/2003_aston-martin_db7-vantage_12032.webp","logoURL":"placeholder.png","carPageUrl":"https://www.carspecs.us/cars/2003/aston-martin/db7-vantage/12032","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":2003,"doors":-1,"cornering":0,"seats":-1,"fuelTankCapacity":81,"engineCapacity":-1000,"powerKW":313,"powerHP":420,"maxTorque":-1,"topSpeed":-1,"weight":-1,"length":-25,"width":-1,"height":-1,"groundClearance":-25,"acceleration":4.62,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.874,"updatedAt":1685308533.874,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":-1,"topSpeed":-1,"acceleration":4.62,"powerHP":420,"width":-1,"height":-1,"cornering":0,"groundClearance":-25,"win":null,"loss":null,"value":null,"createdAt":1686338996.666,"updatedAt":1686338996.666},{"id":"64837db4a4606e7e46c81963","baseCard":{"id":"c_1983_volkswagen_passat-variant-b2_1-8-90-hp-28245","rq":0,"tags":null,"level":null,"manufacturer":"Volkswagen","type":"Passat Variant 1.8","country":"N/A","body":null,"driveWheel":"N/A","fuelType":"Benzin","abs":"N/A","tractionControl":null,"imageUrl":"assets/img/cars/volkswagen_passat-variant-b2_1-8-90-hp-28245.webp","logoURL":"placeholder.png","carPageUrl":"https://osszesauto.hu/volkswagen/passat/passat-variant-b2/1-8-90-hp-28245","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":1983,"doors":-1,"cornering":0,"seats":-1,"fuelTankCapacity":-1,"engineCapacity":-1000,"powerKW":67,"powerHP":90,"maxTorque":-1,"topSpeed":-1,"weight":-1,"length":null,"width":-1,"height":-1,"groundClearance":null,"acceleration":-1,"gear1st":null,"gear2nd":null,"gear3rd":null,"gear4th":null,"gear5th":null,"gear6th":null,"finalDrive":null,"createdAt":1685308533.914,"updatedAt":1685308533.914,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":-1,"topSpeed":-1,"acceleration":-1,"powerHP":90,"width":-1,"height":-1,"cornering":0,"groundClearance":null,"win":null,"loss":null,"value":null,"createdAt":1686338996.67,"updatedAt":1686338996.67},{"id":"64837db4a4606e7e46c81964","baseCard":{"id":"c_1990_saab_9000-hatchback_2-3-16-turbo-cs-195-hp-22205","rq":0,"tags":null,"level":null,"manufacturer":"Saab","type":"9000 Hatchback 2.3 -16 Turbo CS","country":"N/A","body":null,"driveWheel":"N/A","fuelType":"Benzin","abs":"N/A","tractionControl":null,"imageUrl":"assets/img/cars/saab_9000-hatchback_2-3-16-turbo-cs-195-hp-22205.webp","logoURL":"placeholder.png","carPageUrl":"https://osszesauto.hu/saab/9000/9000-hatchback/2-3-16-turbo-cs-195-hp-22205","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":1990,"doors":-1,"cornering":0,"seats":-1,"fuelTankCapacity":-1,"engineCapacity":-1000,"powerKW":145,"powerHP":195,"maxTorque":-1,"topSpeed":-1,"weight":-1,"length":null,"width":-1,"height":-1,"groundClearance":null,"acceleration":-1,"gear1st":null,"gear2nd":null,"gear3rd":null,"gear4th":null,"gear5th":null,"gear6th":null,"finalDrive":null,"createdAt":1685308533.927,"updatedAt":1685308533.927,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":-1,"topSpeed":-1,"acceleration":-1,"powerHP":195,"width":-1,"height":-1,"cornering":0,"groundClearance":null,"win":null,"loss":null,"value":null,"createdAt":1686338996.673,"updatedAt":1686338996.673},{"id":"64837db4a4606e7e46c81965","baseCard":{"id":"c_1994_mazda_rx-7-iii-fd_wankel-twin-turbo-255-hp-13738","rq":0,"tags":null,"level":null,"manufacturer":"Mazda","type":"RX 7 III Wankel Twin Turbo","country":"N/A","body":null,"driveWheel":"RWD","fuelType":"Benzin","abs":"N/A","tractionControl":null,"imageUrl":"assets/img/cars/mazda_rx-7-iii-fd_wankel-twin-turbo-255-hp-13738.webp","logoURL":"placeholder.png","carPageUrl":"https://osszesauto.hu/mazda/rx-7/rx-7-iii-fd/wankel-twin-turbo-255-hp-13738","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":1994,"doors":2,"cornering":71,"seats":-1,"fuelTankCapacity":76,"engineCapacity":-1000,"powerKW":190,"powerHP":255,"maxTorque":398,"topSpeed":250,"weight":1290,"length":null,"width":1760,"height":1230,"groundClearance":null,"acceleration":-1,"gear1st":null,"gear2nd":null,"gear3rd":null,"gear4th":null,"gear5th":null,"gear6th":null,"finalDrive":null,"createdAt":1685308533.939,"updatedAt":1685308533.939,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":1290,"topSpeed":250,"acceleration":-1,"powerHP":255,"width":1760,"height":1230,"cornering":71,"groundClearance":null,"win":null,"loss":null,"value":null,"createdAt":1686338996.675,"updatedAt":1686338996.675}]'
	);*/
	isDisabled: boolean = false;
	actualChallenge!: Challenge;
	actualRound!: Round;

	constructor() {
		console.log('in manin service constructor');
		/*this.getPlayerCards().then((playerCards) => {
		  this.playerCards = playerCards;
			console.log('most van a mainben a cards');
		});*/
		//this.getPlayerCards();
		this.getPlayerCardSkeleton().then((skeleton) => {
		  this.playerCardSkeleton = skeleton;
		});
		this.getChallenges();
		console.log(this.playerCards);
	}

	getChallenges() {
		for (let i = 0; i < this.challenges.length; i++) {
			let challenge = this.challenges[i];
			for (let j = 0; j < challenge.rounds.length; j++) {
				//let round = challenge.rounds[j];
				for (let k = 0; k < 6; k++) {
					let race: Race = {
						opponentCard: this.opponentCards[k + 1],
						playerCard: this.pairedCards[k + 1],
						track: this.simpleFieldRaces[k + 1],
						result: <Result>{}
					};
					this.challenges[i].rounds[j].races[k] = race;
				}
			}

		}
		return this.challenges;
	}

	initResult() {
		this.result.player = 0;
		this.result.opponent = 0;
	}

	toggleDisable() {
		this.isDisabled = !this.isDisabled;
	}


	async getPlayerCardSkeleton() {
		const response = await fetch(environment.endpointPrefix + '/api/playercard/skeleton');
		const data = await response.json();
		return data;
	}

	async getPlayerCards() {
		const response = await fetch(environment.endpointPrefix + '/api/playercard'
			/*,
			{
			  method: "POST",
			  body: JSON.stringify({}),
			  headers: {
				"Content-Type": "application/json"
			  }
			}*/
		);
		const data = await response.json();
		this.playerCards = data;
		return data;
	}

	onDrop(event: CdkDragDrop<any>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			// mozgatott kártya
			console.log(event.previousContainer.data[event.previousIndex].baseCard.imageUrl);
			copyArrayItem(event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				0);
		}
		const cardId = event.previousContainer.data[event.previousIndex].id;
		const card = document.querySelector(`#card_${CSS.escape(cardId)}`);
		card!.classList.add('disabled');
		//console.log(card!.classList.value);
	}

	rechooseCards() {
		this.selectedCards[1] = this.playerCardSkeleton;
		this.selectedCards[2] = this.playerCardSkeleton;
		this.selectedCards[3] = this.playerCardSkeleton;
		this.selectedCards[4] = this.playerCardSkeleton;
		this.selectedCards[5] = this.playerCardSkeleton;
	}

	dropPlacesFilled(places: any) {
		for (let i = 1; i <= 5; i++) {
			if (!places[i].id) {
				return false;
			}
		}
		return true;
	}

	saveSelectedCardsToDb() {
		/*console.log(this.actualRound.order);
		console.log(this.challenges[0].rounds[0].placedCards[1]);
		console.log(this.challenges[0].rounds[1].placedCards[2]);*/
		// placedCards meg  a dropPlaces/mainservice selectedCardjait össze kell fésülni
		this.actualRound.placedCards = this.selectedCards;
		/*console.log(this.challenges[0].rounds[0].placedCards[1]);
		console.log(this.challenges[0].rounds[1].placedCards[2]);*/
	}
}
