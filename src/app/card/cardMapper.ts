import {CardModel} from "./card.model";

export class CardMapper {

    id?: string;

    manufacturer?: string;

    type?: string;

    year?: string;

    country?: string;

    doors?: string;

    body?: string;

    seats?: string;

    driveWheel?: string;

    fuelType?: string;

    fuelTankCapacity?: string;

    engineCapacity?: string;

    powerKW?: string;

    powerHP?: string;

    maxTorque?: string;

    topSpeed?: string;

    acceleration?: string;

    weight?: string;

    length?: string;

    width?: string;

    height?: string;

    groundClearance?: string;

    abs?: string;

    tractionControl?: string;

    imageUrl?: string;

    logoURL?: string;

    carPageUrl?: string;

    objectPositionHorizontal?: string;

    objectPositionVertical?: string;

    objectWidth?: string;

    objectHeight?: string;

    gear1st?: string;

    gear2nd?: string;

    gear3rd?: string;

    gear4th?: string;

    gear5th?: string;

    gear6th?: string;

    finalDrive?: string;


    mapToCard(card: CardModel): any {

        this.id = card.id.value;

        this.manufacturer = card.manufacturer.value;

        this.type = card.type.value;

        this.year = card.year.value;

        this.country = card.country.value;

        this.doors = card.doors.value;

        this.body = card.body.value;

        this.seats = card.seats.value;

        this.driveWheel = card.driveWheel.value;

        this.fuelType = card.fuelType.value;

        this.fuelTankCapacity = card.fuelTankCapacity.value;

        this.engineCapacity = card.engineCapacity.value;

        this.powerKW = card.powerKW.value;

        this.powerHP = card.powerHP.value;

        this.maxTorque = card.maxTorque.value;

        this.topSpeed = card.topSpeed.value;

        this.acceleration = card.acceleration.value;

        this.weight = card.weight.value;

        this.length = card.length.value;

        this.width = card.width.value;

        this.height = card.height.value;

        this.groundClearance = card.groundClearance.value;

        this.abs = card.abs.value;

        this.tractionControl = card.tractionControl.value;

        this.imageUrl = card.imageUrl.value;

        this.logoURL = card.logoURL.value;

        this.carPageUrl = card.carPageUrl.value;

        this.objectPositionHorizontal = card.objectPositionHorizontal.value;

        this.objectPositionVertical = card.objectPositionVertical.value;

        this.objectWidth = card.objectWidth.value;

        this.objectHeight = card.objectHeight.value;

        this.gear1st = card.gear1st.value;

        this.gear2nd = card.gear2nd.value;

        this.gear3rd = card.gear3rd.value;

        this.gear4th = card.gear4th.value;

        this.gear5th = card.gear5th.value;

        this.gear6th = card.gear6th.value;

        this.finalDrive = card.finalDrive.value;

        return this;
    }
}
