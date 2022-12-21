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

    tuningMaxLevel = 44;

    tuningAllMaxLevel = 1000;

    selectedTuningButton!: string;

    doitButton!: HTMLButtonElement;


    constructor(
        private mainService: EventService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.initFields();
        this.refreshDatas();
    }

    private initFields() {
        this.doitButton = (document.querySelector('#saveToDatabaseButton') as HTMLButtonElement);
        this.doitButton.disabled = true;
        this.mainService.updatedCard = this.mainService.selectCardForUpgrade;
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

    private resetCalculatedFields() {
        for (const calculatedField of this.calculatedFields) {
            this.getCalculatedCell(calculatedField.identifier).value = String(this.getBasicPropertyValue(calculatedField.identifier));
        }
    }

    async calculateEngineTuning(identifier: string, multiplierPropertyIdentifier: string) {
        this.doitButton.disabled = false;
        this.mainService.selectCardForUpgrade.tunings.engine.value += 1;
        // működik, mert a refreshben ref szerinti átadás van
        await this.mainService.calculatePlayerCardTuning(this.selectedTuningButton);
        this.mainService.selectCardForUpgrade.tunings.engine.value -= 1;
        await this.refreshDatas();
    }

    async calculateCorneringTuning(identifier: string, multiplierPropertyIdentifier: string) {
        this.doitButton.disabled = false;
        this.mainService.selectCardForUpgrade.tunings.cornering.value += 1;
        // működik, mert a refreshben ref szerinti átadás van
        await this.mainService.calculatePlayerCardTuning(this.selectedTuningButton);
        this.mainService.selectCardForUpgrade.tunings.cornering.value -= 1;
        await this.refreshDatas();
    }

    async calculateChassisTuning(identifier: string, multiplierPropertyIdentifier: string) {
        this.doitButton.disabled = false;
        this.mainService.selectCardForUpgrade.tunings.chassis.value += 1;
        // működik, mert a refreshben ref szerinti átadás van
        await this.mainService.calculatePlayerCardTuning(this.selectedTuningButton);
        this.mainService.selectCardForUpgrade.tunings.chassis.value -= 1;
        await this.refreshDatas();
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

    private reachedMaxTuningLevel(tuningLevel: number) {
        return tuningLevel == this.tuningMaxLevel;
    }

    private disableTuningButton(identifier: string) {
        (document.querySelector(`#tuningButton_${identifier}`) as any).disabled = true;
    }

    saveCalculatedPlayerCard() {
        if (this.selectedTuningButton === null) {
            return;
        }
        this.mainService.saveCalculatedPlayerCard(this.selectedTuningButton);
        this.selectedCard = this.mainService.updatedCard;
        const index = this.mainService.playerCards.indexOf(this.mainService.playerCards.find(pCard => pCard.id.value === this.mainService.updatedCard.id.value));
        this.mainService.playerCards[index] = this.mainService.updatedCard;
        this.mainService.selectCardForUpgrade = this.mainService.updatedCard;
        this.router.navigate(['/home/garage']);
    }

    buttonIsChecked(value: any) {
        return value === this.selectedTuningButton ? true : false;
    }
}
