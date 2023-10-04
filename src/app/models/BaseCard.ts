import {IDTORecord} from "./PlayerCard";

export class BaseCard {

	/*id!: string;

	rq!: number;

	level!: string;

	manufacturer!: string;

	type!: string;

	country!: string;

	body!: string;

	driveWheel!: string;

	fuelType!: string;

	abs!: string;

	tractionControl!: string;

	imageUrl!: string;

	logoURL!: string;

	carPageUrl!: string;

	objectPositionHorizontal!: string;

	objectPositionVertical!: string;

	objectWidth!: string;

	objectHeight!: string;

	year!: number;

	doors!: number;

	cornering!: number;

	seats!: number;

	fuelTankCapacity!: number;

	engineCapacity!: number;

	powerKW!: number;

	powerHP!: number;

	maxTorque!: number;

	topSpeed!: number;

	weight!: number;

	length!: number;

	width!: number;

	height!: number;

	groundClearance!: number;

	acceleration!: number;

	gear1st!: number;

	gear2nd!: number;

	gear3rd!: number;

	gear4th!: number;

	gear5th!: number;

	gear6th!: number;

	finalDrive!: number;

	isPrizeCard!: boolean;*/

	id: IDTORecord = {name: "BCID", value: ''};

	rq: IDTORecord = {name: "RQ", value: ''};

	level: IDTORecord = {name: "Level", value: ''};

	manufacturer: IDTORecord = {name: "Manufacturer", value: ''};

	type: IDTORecord = {name: "Type", value: ''};

	country: IDTORecord = {name: "Country", value: ''};

	body: IDTORecord = {name: "Body", value: ''};

	driveWheel: IDTORecord = {name: "Drive wheel", value: ''};

	fuelType: IDTORecord = {name: "Fuel type", value: ''};

	abs: IDTORecord = {name: "ABS", value: ''};

	tractionControl: IDTORecord = {name: "Traction control", value: ''};

	imageUrl: IDTORecord = {name: "Image URL", value: ''};

	logoURL: IDTORecord = {name: "Logo URL", value: ''};

	carPageUrl: IDTORecord = {name: "Car page URL", value: ''};

	objectPositionHorizontal: IDTORecord = {name: "Object pos. horizontal", value: ''};

	objectPositionVertical: IDTORecord = {name: "Object pos. vertical", value: ''};

	objectWidth: IDTORecord = {name: "Object width", value: ''};

	objectHeight: IDTORecord = {name: "Object height", value: ''};

	year: IDTORecord = {name: "Year", value: ''};

	doors: IDTORecord = {name: "Doors", value: ''};

	cornering: IDTORecord = {name: "Cornering", value: ''};

	seats: IDTORecord = {name: "Seats", value: ''};

	fuelTankCapacity: IDTORecord = {name: "Fuel tank capacity", value: ''};

	engineCapacity: IDTORecord = {name: "Engine capacity", value: ''};

	powerKW: IDTORecord = {name: "Power KW", value: ''};

	powerHP: IDTORecord = {name: "Power (HP)", value: ''};

	maxTorque: IDTORecord = {name: "Max torque", value: ''};

	topSpeed: IDTORecord = {name: "Top speed (km/h)", value: ''};

	weight: IDTORecord = {name: "Weight (kg)", value: ''};

	length: IDTORecord = {name: "Length (mm)", value: ''};

	width: IDTORecord = {name: "Width (mm)", value: ''};

	height: IDTORecord = {name: "Height (mm)", value: ''};

	groundClearance: IDTORecord = {name: "Ground clearance (mm)", value: ''};

	acceleration: IDTORecord = {name: "Acceleration (0-100km/h)", value: ''};

	gear1st: IDTORecord = {name: "Gear 1st", value: ''};

	gear2nd: IDTORecord = {name: "Gear 2nd", value: ''};

	gear3rd: IDTORecord = {name: "Gear 3rd", value: ''};

	gear4th: IDTORecord = {name: "Gear 4rd", value: ''};

	gear5th: IDTORecord = {name: "Gear 5rd", value: ''};

	gear6th: IDTORecord = {name: "Gear 6rd", value: ''};

	finalDrive: IDTORecord = {name: "Final drive", value: ''};

	isPrizeCard: IDTORecord = {name: "Prize card", value: ''};
}