import {BaseCard} from "./BaseCard";

export interface IDTORecord {
	frontName?: string;
	name: string;
	value: number | string | [] | null | undefined;
}

export class PlayerCard {

	/*id = {name: "ID"};

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

	acceleration = {name: "Acceleration (0-100km/h)"};*/

	public static names = {
		id: {name: "ID"},
		baseCard: BaseCard,
		//tunings: any,
		powerHP: "Power (HP)",
		cornering: "Cornering",
		tags: 'Tags',
		//win: number,
		//loss: number,
		//value: number,
		//createdAt: any,
		//updatedAt: any,
		topSpeed: "Top speed (km/h)",
		weight: "Weight (kg)",
		width: "Width (mm)",
		height: "Height (mm)",
		groundClearance: "Grnd. clr. (mm)",
		acceleration: "Acc. (0-100km/h)",
	}

	id: IDTORecord = {name: 'ID', value: ''}

	baseCard: any

	//tunings: IDTORecord = {name: 'Tunings', value: ''}
	tunings: any

	powerHP: IDTORecord = {frontName: 'HP', name: 'Power (HP)', value: ''}

	cornering: IDTORecord = {frontName: 'Cornering', name: 'Cornering', value: ''}

	tags: IDTORecord = {name: 'Tags', value: ''}

	win: IDTORecord = {name: 'Win', value: ''}

	loss: IDTORecord = {name: 'Loose', value: ''}

	value: IDTORecord = {name: 'Value', value: ''}

	createdAt: IDTORecord = {name: '', value: ''}

	updatedAt: IDTORecord = {name: '', value: ''}

	topSpeed: IDTORecord = {frontName: 'Speed', name: 'Top speed', value: ''}

	weight: IDTORecord = {frontName: 'Weight', name: 'Weight', value: ''}

	width: IDTORecord = {name: 'Width', value: ''}

	height: IDTORecord = {name: 'Height', value: ''}

	groundClearance: IDTORecord = {name: 'Ground clearance', value: ''}

	acceleration: IDTORecord = {frontName: '0-100', name: 'Acceleration(0-100km/h)', value: ''}

	public getName() {
		return
	}
}