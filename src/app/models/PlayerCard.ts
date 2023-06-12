import {BaseCard} from "./BaseCard";

interface IDTORecord {
	name: string;
	value: number | string | null | undefined;
}

export class PlayerCard {

	id = {name: "ID"};

	baseCard!: BaseCard;

	tunings: any;

	powerHP = {name: "Power (HP)"};

	cornering = {name: "Cornering"};

	tags!: string[];

	win!: number;

	loss!: number;

	value!: number;

	createdAt!: any;

	updatedAt!: any;

	topSpeed = {name: "Top speed (km/h)"};

	weight = {name: "Weight (kg)"};

	width = {name: "Width (mm)"};

	height = {name: "Height (mm)"};

	groundClearance = {name: "Ground clearance (mm)"};

	acceleration = {name: "Acceleration (0-100km/h)"};

}