

export class IFilter {
	simpleValues?: ISimpleValue[];
	multipleValues?: IMultipleValue[];
	betweens?: IBetween[];
}

export interface IBetween {
	name: string;
	min: number;
	max: number;
}

export interface IMultipleValue {
	name: string;
	values: (string | number)[];
}

export interface ISimpleValue {
	name: string;
	value: string | number;
}