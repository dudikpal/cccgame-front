import {Component, Input, OnInit} from '@angular/core';
import {EventService} from "../event.service";
import {Router} from "@angular/router";

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

    tuningMaxLevel = 4;

    selectedTuningButton!: string;

    constructor(
        private mainService: EventService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.selectedCard = this.mainService.selectCardForUpgrade;
        this.calculatedFields = [];

        for (const calculatedField of Object.entries(this.selectedCard.calculatedFields).values()) {
            const [identifier, dataObject] = calculatedField;
            const name = (dataObject as any).name;
            const baseValue = (dataObject as any).value;
            const calcField = {
                name: name,
                identifier: identifier,
                baseValue: baseValue,
                calculatedValue: baseValue
            };

            this.calculatedFields.push(calcField);
        }

        for (const selectedCardElement of Object.entries(this.selectedCard.tunings)) {
            const identifier = selectedCardElement[0];
            const actualTuningLevel = (selectedCardElement[1] as any).value;

            if (this.reachedMaxTuningLevel(actualTuningLevel)) {
                this.disableTuningButton(identifier);
            }
        }
    }

    goToHome() {
        this.router.navigate(['/home']);
    }

    calculateTuningField(identifier: string) {
        const multiplierPropertyIdentifier = identifier.replace('tuning_', '');

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
        this.calculateCellValue('acceleration', multiplierValues);
        this.calculateCellValue('topSpeed', multiplierValues);
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

    upgradeTuningLevel() {

        let tuningLevel = this.selectedCard.tunings[`${this.selectedTuningButton}`].value;

        if (tuningLevel === this.tuningMaxLevel) {
            return;
        }

        this.selectedCard.tunings[`${this.selectedTuningButton}`].value++;

        for (const calculatedField of this.calculatedFields) {
            this.selectedCard.calculatedFields[`${calculatedField.identifier}`].value = calculatedField.calculatedValue;
        }

        this.mainService.upgradePlayerCard(this.selectedCard);
        this.router.navigate(['/home/garage']);
    }
}
