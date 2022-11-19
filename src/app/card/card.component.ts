import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";
import {Event} from "@angular/router";
import {EventService} from "../event.service";
import {CardModel} from "./card.model";
import {environment} from "../../environments/environment";

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

    @Input() playerCard!: any;

    manufacturerLogoUrlPrefix = environment.imgFilePrefix;


    constructor(
        private eventService: EventService,
    ) {
    }


    ngOnInit(): void {
    }


    public generateLogoUrl(filename: string) {
            return this.manufacturerLogoUrlPrefix + filename;
    }


    public flipToFront(givenId: any) {

        let card = document.querySelector(`#${CSS.escape(givenId)}`)!;
        card.classList.remove('flipCard');
    }


    frontDatas() {
        return [
            this.playerCard.calculatedFields.topSpeed,
            this.playerCard.calculatedFields.acceleration,
            this.playerCard.card.value.driveWheel,
            this.playerCard.card.value.engineCapacity,
        ];
    }


    iTabDatas() {

        return [
            this.playerCard.calculatedFields.acceleration,
            this.playerCard.calculatedFields.topSpeed,
            this.playerCard.card.value.engineCapacity,
            this.playerCard.card.value.maxTorque,
            this.playerCard.calculatedFields.weight,
            this.playerCard.card.value.fuelTankCapacity,
            this.playerCard.calculatedFields.groundClearance,
        ];
    }

    iiTabDatas() {

        return [
            this.playerCard.card.value.year,
            this.playerCard.card.value.country,
            this.playerCard.card.value.driveWheel,
            this.playerCard.card.value.fuelType,
            this.playerCard.card.value.abs,
            this.playerCard.card.value.tractionControl,
        ];
    }

    iiiTabDatas() {

        return [
            this.playerCard.card.value.body,
            this.playerCard.card.value.doors,
            this.playerCard.card.value.seats,
            this.playerCard.card.value.length,
            this.playerCard.calculatedFields.width,
            this.playerCard.calculatedFields.height,
        ];
    }

    ivTabDatas() {

        return [
            this.playerCard.card.value.gear1st,
            this.playerCard.card.value.gear2nd,
            this.playerCard.card.value.gear3rd,
            this.playerCard.card.value.gear4th,
            this.playerCard.card.value.gear5th,
            this.playerCard.card.value.gear6th,
            this.playerCard.card.value.finalDrive,
        ];
    }

    ngOnChanges() {
//        console.log('data', this.cardValue);
    }


    async fetchAllCard() {

        /*const response = await fetch(this.url);
        const jsonData = await response.json();
        console.log(jsonData);*/
    }

    frontClick(id: string) {
        let card = document.querySelector(`#${CSS.escape(id)}`)!;
        card.classList.add('flipCard');
        /*const original = card.querySelector(`#select_btn_${id}`)!;
        let clone = <Element>original.cloneNode(true);
        clone.removeAttribute('id');
        let backFace = document.querySelector(`#backSelectButton_${id}`)!;
        backFace = clone;
        console.log(clone)
        console.log(backFace)*/
    }
}
