import {Component, Input, OnInit} from '@angular/core';
import {EventService} from "../event.service";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {FormControl, FormGroup} from "@angular/forms";
import {main} from "@popperjs/core";


interface MultiplierValues {
    optionalMultiplierValue: number,
    baseMultiplierValue: number,
}

@Component({
    selector: 'app-upgrade',
    templateUrl: './upgrade.component.html',
    styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {

    selectedCard: any;

    calculatedFields: any;

    tuningMaxLevel = 44;

    tuningAllMaxLevel = 1000;

    selectedTuningButton!: string;


    constructor(
        private mainService: EventService,
        private router: Router
    ) {
    }

    ngOnInit(): void {

        this.mainService.updatedCard = this.mainService.selectCardForUpgrade;
        this.refreshDatas();
    }

    refreshDatas() {
        this.calculatedFields = [];
        this.selectedCard = this.mainService.selectCardForUpgrade;

        for (const calculatedField of Object.entries(this.selectedCard.calculatedFields).values()) {
            const [identifier, dataObject] = calculatedField;
            if (identifier === 'cornering') {
                continue;
            }
            const name = (dataObject as any).name;
            const calculatedValue = (dataObject as any).value;
            const calcField = {
                name: name,
                identifier: identifier,
                baseValue: this.selectedCard.calculatedFields[`${identifier}`].value,
                calculatedValue: this.mainService.updatedCard.calculatedFields[`${identifier}`].value
            };

            this.calculatedFields.push(calcField);
        }

        let actualTuningAllLevel = 0;
        let tuningIdentifiers: string[] = [];

        for (const selectedCardElement of Object.entries(this.selectedCard.tunings)) {
            const identifier = selectedCardElement[0];
            const actualTuningLevel = (selectedCardElement[1] as any).value;
            tuningIdentifiers.push(identifier);
            actualTuningAllLevel += actualTuningLevel;

            if (this.reachedMaxTuningLevel(actualTuningLevel)) {
                this.disableTuningButton(identifier);
            }

            if (actualTuningAllLevel === this.tuningAllMaxLevel) {
                this.disableAllTuningButton(tuningIdentifiers);
            }
        }
    }

    goToHome() {
        this.router.navigate(['/home']);
    }

    disableAllTuningButton(identifiers: string[]) {
        for (const identifier of identifiers) {
            this.disableTuningButton(identifier);
        }
    }

    calculateTuningField(identifier: string, event: Event) {
        const multiplierPropertyIdentifier = identifier.replace('tuning_', '');
        //console.log((event.target as HTMLInputElement).value);
        if (this.selectedTuningButton !== null) {
            this.resetCalculatedFields();
        }

        this.selectedTuningButton = multiplierPropertyIdentifier;

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

        /*this.selectedCard.tunings.engine.value += 1;
        const multiplierValues = this.getMultiplierValues(identifier, multiplierPropertyIdentifier);
        this.calculateCellValue('powerHP', multiplierValues);
        this.calculateCellValue('acceleration', multiplierValues);
        this.calculateCellValue('topSpeed', multiplierValues);*/
    }

    calculateCorneringTuning(identifier: string, multiplierPropertyIdentifier: string) {

        /*this.selectedCard.tunings.cornering.value += 1;
        const multiplierValues = this.getMultiplierValues(identifier, multiplierPropertyIdentifier);
        this.calculateCellValue('width', multiplierValues);
        this.calculateCellValue('height', multiplierValues);
        this.calculateCellValue('groundClearance', multiplierValues);
        this.calculateCornering();*/
    }

    async calculateChassisTuning(identifier: string, multiplierPropertyIdentifier: string) {
        /*console.log((document.querySelector("input[type='radio'][name='tuningRadioButton']:checked") as HTMLInputElement).value);
        console.log(this.selectedTuningButton);*/
        this.mainService.selectCardForUpgrade.tunings.chassis.value += 1;
        // működik, mert a refreshben ref szerinti átadás van
        await this.mainService.calculatePlayerCardTuning(this.selectedTuningButton);
        this.mainService.selectCardForUpgrade.tunings.chassis.value -= 1;
        await this.refreshDatas();

        /*const multiplierValues = this.getMultiplierValues(identifier, multiplierPropertyIdentifier);
        this.calculateCellValue('weight', multiplierValues);
        this.calculateCellValue('acceleration', multiplierValues);
        this.calculateCellValue('topSpeed', multiplierValues);
        this.calculateCornering();*/
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
            case 'acceleration':
                calculatedCell.value = String((baseValue * (1 - (multiplierValues.optionalMultiplierValue * multiplierValues.baseMultiplierValue))).toFixed(2));
                this.calculatedFields.find((field: { identifier: string; }) => field.identifier === identifier).calculatedValue = calculatedCell.value;
                break;
            case 'weight':
            case 'groundClearance':
            case 'height':
                calculatedCell.value = String((baseValue * (1 - (multiplierValues.optionalMultiplierValue * multiplierValues.baseMultiplierValue))).toFixed(0));
                this.calculatedFields.find((field: { identifier: string; }) => field.identifier === identifier).calculatedValue = calculatedCell.value;
                break;
            case 'topSpeed':
            case 'width':
            case 'powerHP':
                calculatedCell.value = String((baseValue * (1 + (multiplierValues.optionalMultiplierValue * multiplierValues.baseMultiplierValue))).toFixed(0));
                this.calculatedFields.find((field: { identifier: string; }) => field.identifier === identifier).calculatedValue = calculatedCell.value;
                break;
        }
    }

    private getCalculatedCell(identifier: string) {
        return document.querySelector(`#input_${identifier}_playerCard`) as HTMLInputElement;
    }

    private getOptionalMultiplierValue(identifier: string) {
        let actualTuningLevel = this.selectedCard.tunings[`${identifier}`].value;

        if (!this.reachedMaxTuningLevel(actualTuningLevel)) {
            actualTuningLevel++;
        }
        return actualTuningLevel;
    }

    private getBasicPropertyValue(identifier: string) {
        return Number((document.querySelector(`#input_${identifier}`) as HTMLInputElement).value);
    }

    private getBaseMultiplierValue(multiplierPropertyIdentifier: string) {
        return Number((this.mainService.tuningMultipliers as any)[`${multiplierPropertyIdentifier.toUpperCase()}`]);
    }

    private resetCalculatedFields() {
        for (const calculatedField of this.calculatedFields) {
            this.getCalculatedCell(calculatedField.identifier).value = String(this.getBasicPropertyValue(calculatedField.identifier));
        }
    }

    private reachedMaxTuningLevel(tuningLevel: number) {
        return tuningLevel == this.tuningMaxLevel;
    }

    private disableTuningButton(identifier: string) {
        (document.querySelector(`#tuningButton_${identifier}`) as any).disabled = true;
    }

    saveCalculatedPlayerCard() {

        this.mainService.saveCalculatedPlayerCard(this.selectedTuningButton);
        this.selectedCard = this.mainService.updatedCard;
        const index = this.mainService.playerCards.indexOf(this.mainService.playerCards.find(pCard => pCard.id.value === this.mainService.updatedCard.id.value));
        this.mainService.playerCards[index] = this.mainService.updatedCard;
        this.mainService.selectCardForUpgrade = this.mainService.updatedCard;

        /*let tuningLevel = this.selectedCard.tunings[`${this.selectedTuningButton}`].value;

        if (tuningLevel === this.tuningMaxLevel) {
            return;
        }

        this.selectedCard.tunings[`${this.selectedTuningButton}`].value++;

        for (const calculatedField of this.calculatedFields) {
            this.selectedCard.calculatedFields[`${calculatedField.identifier}`].value = calculatedField.calculatedValue;
        }

        this.mainService.updatePlayerCard(this.selectedCard);*/
        this.router.navigate(['/home/garage']);
    }

    buttonIsChecked(value: any) {
        return value === this.selectedTuningButton ? true : false;
    }
}
