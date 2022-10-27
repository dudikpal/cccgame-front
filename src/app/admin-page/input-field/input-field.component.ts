import {AfterViewInit, Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {InitProps} from "../../admin-page/admin-page.component";
import {environment} from "../../../environments/environment";
import {EventService} from "../../event.service";
import {main} from "@popperjs/core";
import {AdminService} from "../../services/admin.service";



@Component({
    selector: 'app-input-field',
    templateUrl: './input-field.component.html',
    styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit, AfterViewInit, OnChanges {

    @Input() initAllProps!: any;

    @Input() selectedCard: any;

    url = environment.endpointPrefix + '/api/cards';

    multiplierFieldValue: any;



    constructor(private mainService: EventService,
                private adminService: AdminService) {
    }

    ngOnInit(): void {
        //console.log(this.initProps);
    }

    ngAfterViewInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    createNewCard() {

        const createdCard = this.inputFieldsToCard();

        fetch(this.url, {
            method: "POST",
            body: JSON.stringify(createdCard),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    inputFieldsToCard() {

        let newCard = JSON.parse(JSON.stringify(this.selectedCard.card.value));

        for (const prop of this.initAllProps.cardProps) {

            newCard[prop.identifier].value = (document.querySelector(`#input_${prop.identifier}`) as HTMLInputElement).value;
        }

        return newCard;
    }


    getPropValue(prop: String) {

        console.log(this.selectedCard);
        //console.log(this.selectedCard.card.value[`${prop}`].value);
        return this.selectedCard[`${prop}`].value;
        //return null;
    }


    updateCard() {

        /*const updatedCard = this.inputFieldsToCard();
        this.mainService.updateCard.emit(updatedCard);*/
    }

    update() {

        let updatedCard = this.inputFieldsToCard();

        this.adminService.updateCard(updatedCard);
    }


    calcField(multiplierPropertyIdentifier: any) {

        const calculatedPropertyIdentifier = multiplierPropertyIdentifier.replace('tuning', '').toLowerCase();
        const calculatedPropertyName = calculatedPropertyIdentifier.toUpperCase();
        const calculatedPropertyField = document.querySelector(`#input_${calculatedPropertyIdentifier}`) as HTMLInputElement;
        const multiplier = this.mainService.tuningMultipliers[calculatedPropertyName];
// @ts-ignore
        this.selectedCard.card.value[`${calculatedPropertyIdentifier}`].value = calculatedPropertyField.value * this.multiplierFieldValue * multiplier
        //calculatedPropertyField.value = this.multiplierFieldValue * multiplier;
        //console.log('card value before change: ' + this.selectedCard.card.value[propName].value);
        console.log(this.selectedCard);
        /*console.log(calculatedPropertyIdentifier);
        //console.log(propertyField.value);
        console.log(Object.keys(multipliers));
        console.log()*/
        //console.log('card value before change: ' + this.selectedCard.card.value[propName].value);

    }
}
