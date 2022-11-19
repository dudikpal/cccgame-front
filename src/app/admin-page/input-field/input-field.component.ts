import {AfterViewInit, Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {environment} from "../../../environments/environment";
import {EventService} from "../../event.service";
import {AdminService} from "../../services/admin.service";;

interface MultiplierValues {
    optionalMultiplierValue: number,
    baseMultiplierValue: number,
}

@Component({
    selector: 'app-input-field',
    templateUrl: './input-field.component.html',
    styleUrls: ['./input-field.component.css']
})


export class InputFieldComponent implements OnInit {

    @Input() initAllProps!: any;

    @Input() selectedCard: any;

    url = environment.endpointPrefix + '/api/cards';

    constructor(private mainService: EventService,
                private adminService: AdminService) {
    }

    ngOnInit(): void {
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

    update() {

        let updatedCard = this.inputFieldsToCard();
        this.adminService.updateCard(updatedCard);
    }

    calculateTuningField(identifier: string) {

        const multiplierPropertyIdentifier = identifier.replace('tuning_', '');

        switch (multiplierPropertyIdentifier) {
            case 'chassis':
                this.calculateChassisTuning(identifier, multiplierPropertyIdentifier);
                break;
            case 'engine':
                this.calculateEngineTuning(identifier, multiplierPropertyIdentifier);
                break;
            case 'cornering':
                this.calculateCorneringTuning(identifier, multiplierPropertyIdentifier);
                break;
        }
    }

    calculateEngineTuning(identifier: string, multiplierPropertyIdentifier: string) {
        const multiplierValues = this.getMultiplierValues(identifier, multiplierPropertyIdentifier);
        this.calculateCellValue('powerHP', multiplierValues);
        this.calculateCellValue('acceleration', multiplierValues);
        this.calculateCellValue('topSpeed', multiplierValues);
    }

    calculateCorneringTuning(identifier: string, multiplierPropertyIdentifier: string) {
        const multiplierValues = this.getMultiplierValues(identifier, multiplierPropertyIdentifier);
        this.calculateCellValue('width', multiplierValues);
        this.calculateCellValue('height', multiplierValues);
        this.calculateCellValue('groundClearance', multiplierValues);
        this.calculateCornering();
    }

    calculateChassisTuning(identifier: string, multiplierPropertyIdentifier: string) {
        const multiplierValues = this.getMultiplierValues(identifier, multiplierPropertyIdentifier);
        this.calculateCellValue('weight', multiplierValues);
        this.calculateCornering();
    }

    getMultiplierValues(identifier: string, multiplierPropertyIdentifier: string) {
        return {
            optionalMultiplierValue: this.getOptionalMultiplierValue(identifier),
            baseMultiplierValue: this.getBaseMultiplierValue(multiplierPropertyIdentifier)
        };
    }

    calculateCornering() {
        const corneringCell = this.getCalculatedCell('cornering');
        corneringCell.value = 'calculated';
    }

    calculateCellValue(identifier: string, multiplierValues: MultiplierValues) {
        const baseValue = this.getBasicPropertyValue(identifier);
        const calculatedCell = this.getCalculatedCell(identifier);

        /* FALLTHROUGH */
        switch (identifier) {
            case 'weight':
            case 'acceleration':
            case 'groundClearance':
            case 'height':
                calculatedCell.value = String(baseValue * (1 - (multiplierValues.optionalMultiplierValue * multiplierValues.baseMultiplierValue)));
                break;
            case 'topSpeed':
            case 'width':
            case 'powerHP':
                calculatedCell.value =  String(baseValue * (1 + (multiplierValues.optionalMultiplierValue * multiplierValues.baseMultiplierValue)));
                break;
        }
    }

    getCalculatedCell(identifier: string) {
        return document.querySelector(`#input_${identifier}_playerCard`)as HTMLInputElement;
    }

    getOptionalMultiplierValue(identifier: string) {
        return Number((document.querySelector(`#input_${identifier}_playerCard`)as HTMLInputElement).value);
    }

    getBasicPropertyValue(identifier: string) {
        return Number((document.querySelector(`#input_${identifier}`)as HTMLInputElement).value);
    }

    getBaseMultiplierValue(multiplierPropertyIdentifier: string) {
        return Number((this.mainService.tuningMultipliers as any)[`${multiplierPropertyIdentifier.toUpperCase()}`]);
    }
}
