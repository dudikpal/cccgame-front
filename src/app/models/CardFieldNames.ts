export class CardFieldNames {

	static fieldNames: any = {
		id: "BCID",
		rq: "RQ",
		level: "Level",
		manufacturer: "Manufacturer",
		type: "Type",
		country: "Country",
		body: "Body",
		driveWheel: "Drive wheel",
		fuelType: "Fuel type",
		abs: "ABS",
		tractionControl: "Traction control",
		imageUrl: "Image URL",
		logoURL: "Logo URL",
		carPageUrl: "Car page URL",
		objectPositionHorizontal: "Object pos. horizontal",
		objectPositionVertical: "Object pos. vertical",
		objectWidth: "Object width",
		objectHeight: "Object height",
		year: "Year",
		doors: "Doors",
		cornering: "Cornering",
		seats: "Seats",
		fuelTankCapacity: "Fuel tank capacity",
		engineCapacity: "Engine capacity",
		powerKW: "Power KW",
		powerHP: "Power (HP)",
		maxTorque: "Max torque",
		topSpeed: "Top speed (km/h)",
		weight: "Weight (kg)",
		length: "Length (mm)",
		width: "Width (mm)",
		height: "Height (mm)",
		groundClearance: "Ground clearance (mm)",
		acceleration: "Acceleration (0-100km/h)",
		gear1st: "Gear 1st",
		gear2nd: "Gear 2nd",
		gear3rd: "Gear 3rd",
		gear4th: "Gear 4rd",
		gear5th: "Gear 5rd",
		gear6th: "Gear 6rd",
		finalDrive: "Final drive",
		isPrizeCard: "Prize card",
		tuningsBody: "Chassis tuning",
		tuningsEngine: "Engine tuning",
		tuningsCornering: "Cornering tuning",
	}

	static tuningFieldNames: any = {
		body: "Tunings Body level",
		engine: "Tunings Engine level",
		cornering: "Tunings Cornering level",
}

	public static getFieldName(field: string) {
		return this.fieldNames[field];
	}

	public static getTuningFieldName(field: string) {
		return this.tuningFieldNames[field];
	}
}