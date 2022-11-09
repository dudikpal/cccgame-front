import {AfterViewInit, Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {InitProps} from "../../admin-page/admin-page.component";
import {environment} from "../../../environments/environment";
import {EventService} from "../../event.service";
import {main} from "@popperjs/core";
import {AdminService} from "../../services/admin.service";
import {coerceNumberProperty} from "@angular/cdk/coercion";


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

        console.log('calcfield funtion: ');
        console.log(multiplierPropertyIdentifier);
const baseMultiplier = (this.mainService.tuningMultipliers as any)['ENGINE'];

        let optionalMultiplierCell = document.querySelector(`#input_${multiplierPropertyIdentifier}_playerCard`)as HTMLInputElement;
        let optionalMultiplierValue = Number(optionalMultiplierCell.value);
        const baseValue = this.selectedCard.card.value[multiplierPropertyIdentifier].value;
        const multipliedCell = document.querySelector(`#input_${multiplierPropertyIdentifier}`)as HTMLInputElement
        const multipliedValue = Number(multipliedCell.value);
        multipliedCell.value = String(multipliedValue * optionalMultiplierValue * baseMultiplier);
        console.log(multipliedCell);

        //const calculatedPropertyIdentifier = multiplierPropertyIdentifier.replace('tuning', '').toLowerCase();
        //const calculatedPropertyName = calculatedPropertyIdentifier.toUpperCase();
        //const calculatedPropertyField = document.querySelector(`#input_${calculatedPropertyIdentifier}`) as HTMLInputElement;
        //const multiplier = this.mainService.tuningMultipliers[calculatedPropertyName];
// @ts-ignore
        //this.selectedCard.card.value[`${calculatedPropertyIdentifier}`].value = calculatedPropertyField.value * this.multiplierFieldValue * multiplier
        // = 0
        // :
        // {identifier: 'tuningWeight', name: 'Tuning Weight', value: 1}
        // 1
        // :
        // {identifier: 'tuningEngine', name: 'Tuning Engine', value: 1}
        // 2
        // :
        // {identifier: 'tuningCornering', name: 'Tuning Cornering', value: 1}
        //calculatedPropertyField.value = this.multiplierFieldValue * multiplier;
        //console.log('card value before change: ' + this.selectedCard.card.value[propName].value);
        //console.log(this.selectedCard);
        /*console.log(calculatedPropertyIdentifier);
        //console.log(propertyField.value);
        console.log(Object.keys(multipliers));
        console.log()*/
        //console.log('card value before change: ' + this.selectedCard.card.value[propName].value);

    }
}
