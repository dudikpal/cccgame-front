import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";
import {Event} from "@angular/router";
import {EventService} from "../event.service";
import {CardModel} from "./card.model";

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

    @Input() card!: CardModel;



    constructor(
        private eventService: EventService,
    ) {
    }


    ngOnInit(): void {

        /*const image = document.querySelector(".img-car") as HTMLElement;
        image.style.width = this.card.objectWidth.value;
        image.style.height = this.card.objectHeight.value;
        image.style.objectPosition = this.card.objectPositionHorizontal.value + ' ' + this.card.objectPositionVertical.value;
        image.setAttribute("src", this.card.imageUrl.value);*/
        /*[style.width]=
            [style.height]=card.objectHeight.value
            [style.object-position]="card.objectPositionHorizontal.value + ' ' + card.objectPositionVertical.value"
            [src]=card.imageUrl.value*/

    }



    public flipToFront(givenId: any) {

        let card = document.querySelector(`#${givenId}`)!;
        card.classList.remove('flipCard');
    }



    frontDatas() {

        return [
            this.card.topSpeed,
            this.card.acceleration,
            this.card.driveWheel,
            this.card.engineCapacity,
        ];
    }

    iTabDatas() {

        return [
            this.card.acceleration,
            this.card.topSpeed,
            this.card.engineCapacity,
            this.card.maxTorque,
            this.card.weight,
            this.card.fuelTankCapacity,
            this.card.groundClearance,
        ];
    }

    iiTabDatas() {

        return [
            this.card.year,
            this.card.country,
            this.card.driveWheel,
            this.card.fuelType,
            this.card.abs,
            this.card.tractionControl
        ];
    }

    iiiTabDatas() {

        return [
            this.card.body,
            this.card.doors,
            this.card.seats,
            this.card.length,
            this.card.width,
            this.card.height,
        ];
    }

    ivTabDatas() {

        return [
            this.card.gear1st,
            this.card.gear2nd,
            this.card.gear3rd,
            this.card.gear4th,
            this.card.gear5th,
            this.card.gear6th,
            this.card.finalDrive
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
        let card = document.querySelector(`#${id}`)!;
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
