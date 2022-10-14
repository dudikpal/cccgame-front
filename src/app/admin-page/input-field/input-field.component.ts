import {AfterViewInit, Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {InitProps} from "../../admin-page/admin-page.component";
import {environment} from "../../../environments/environment";
import {EventService} from "../../event.service";
import {main} from "@popperjs/core";



@Component({
    selector: 'app-input-field',
    templateUrl: './input-field.component.html',
    styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit, AfterViewInit, OnChanges {

    @Input() initAllProps!: any;

    @Input() selectedCard: any;

    url = environment.endpointPrefix + '/api/cards';



    constructor(private mainService: EventService) {
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

        console.log('in fieldstocard:');
        console.log(this.selectedCard);
        let newCard = JSON.parse(JSON.stringify(this.selectedCard.card.value));

        for (const prop of this.initAllProps.cardProps) {

            newCard[prop.identifier].value = (document.querySelector(`#input_${prop.identifier}`) as HTMLInputElement).value;
        }
        console.log(newCard);
        return newCard;
    }



    getPropValue(prop: String) {

        console.log(this.selectedCard);
        //console.log(this.selectedCard.card.value[`${prop}`].value);
        return this.selectedCard[`${prop}`].value;
        //return null;
    }

    updateCard() {

        const updatedCard = this.inputFieldsToCard();
        console.log('in input field:');
        console.log(updatedCard);
        this.mainService.updateCard.emit(updatedCard);
    }
    update() {

        let updatedCard = this.inputFieldsToCard();

        fetch(this.url, {
            method: "PUT",
            body: JSON.stringify(updatedCard),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
