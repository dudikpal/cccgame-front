import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CardModel} from "../card/card.model";
import {EventService} from "../event.service";
import {HttpClient} from "@angular/common/http";
import {isEmpty, Observable, window} from "rxjs";
//import {log} from "util";
import {CardMapper} from "../card/cardMapper";
import {environment} from "../../environments/environment";
import {InputFieldComponent} from "./input-field/input-field.component";
import {AdminService} from "../services/admin.service";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";

export type InitProps = {
    identifier: string,
    name: string,
    value: number | string,
}

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

    cardDTO: CardModel = new CardModel();
    initAllProps: {cardProps: InitProps[]; playerCardProps: InitProps[]} = {cardProps: [], playerCardProps: []};
    cardList!: any[];
    selectedCard: any = '';
    searchFieldsShow = false;
    toggleCheckField = false;
    url = environment.endpointPrefix + '/api/cards';
    concatenatedFilename = 'all-card';

    constructor(
        private eventService: EventService,
        private http: HttpClient,
        private adminService: AdminService
    ) {}

    ngOnInit(): void {

        this.eventService.childEventListener().subscribe(item => {

            this.selectedCard = item;
        });

        this.selectedCard = this.eventService.playerCardSkeleton;
        this.cardPropertiesExtractor();
    }

    deleteCard() {

        fetch(this.url + '/' + this.selectedCard.card.value.id.value, {
            method: 'delete'
        });
    }

    resetCardsTable() {

        if (confirm('Will be delete all cards from document!\nAre you sure?')) {

            fetch(this.url, {
                method: 'delete'
            });
        }
    }

    readCardsFromFile() {

        let input = document.createElement('input');
        const button = document.querySelector('#read-from-file-btn');
        input.type = 'file';

        input.onchange = e => {

            let file = input.files![0];

            let reader = new FileReader();
            reader.readAsText(file, 'UTF-8');

            reader.onload = readerEvent => {
                let content = readerEvent.target!.result;

                fetch(this.url + '/uploadfile', {
                    method: "POST",
                    body: content,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

            }
        }

        input.click();
    }


    writeCardsToFile(cardList: CardModel[]) {

        let fileName: string;
        const d = new Date();
        const dateTime = d.getFullYear() + '-'
            + d.getMonth() + '-'
            + d.getUTCDay() + '-'
            + d.getHours() + '-'
            + d.getMinutes() + '-'
            + d.getSeconds() + '-';

        if (this.concatenatedFilename === '') {
            fileName = dateTime.concat('all-card.txt');
        } else {
            fileName = dateTime.concat(this.concatenatedFilename + '.txt');
        }

        const fileContent = this.createFileContent(cardList);
        const file = new Blob([fileContent], {type: "text/plain"});
        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = fileName;
        link.click();
        link.remove();
    }


    createFileContent(cardList: CardModel[]): any {

        let cards: any[] = [];

        for (let cardModel of cardList) {

            cards.push(new CardMapper().mapToCard(cardModel));
        }

        return JSON.stringify(cards);
    }


    findCards() {

        const selectButton = document.querySelector('#select-btn') as HTMLElement;
        const inputFields = document.querySelectorAll('[data-search]');
        let simpleValues = [];
        let betweenValues = [];
        let multipleValues = [];
        this.concatenatedFilename = '';

        for (const inputField of Array.from(inputFields)) {
            const attrName = inputField.getAttribute('data-search')!;
            const value = (inputField as HTMLInputElement).value.trim();

            if (value) {
                this.concatenatedFilename += '(' + attrName + '-' + value + ')';
            }

            if (value.includes(',')) {
                multipleValues.push({
                    name: attrName,
                    values: [...value.split(',')]
                });
                //(this.cardDTO as any)[attrName] = null;
                //(this.cardDTO as any)[attrName] = value.split(',');
            } else if (value.includes('-')) {
                betweenValues.push({
                    name: attrName,
                    values: [value.match(/^\d+(\.\d+)?/)![0], value.match(/(\d+\.)?\d+$/)![0]]
                });
                //(this.cardDTO as any)[attrName] = null;
                //(this.cardDTO as any)[attrName] = value;
            } else if (value !== '') {
                simpleValues.push({
                    name: attrName,
                    values: [value]
                });
                //(this.cardDTO as any)[attrName] = this.convertEmptyToNull(value);
            }
        }

        const selectedCheckFields = document.querySelectorAll('[data-check].active');
        let isNullFields = [];

        for (const checkField of Array.from(selectedCheckFields)) {
            const attrName = checkField.getAttribute('data-check')!;
            isNullFields.push(attrName);
            //(this.cardDTO as any)[attrName] = null;
        }

        // in DTO just the simple values left
        const tupleQuery = JSON.stringify({
            //card: this.cardDTO,
            simpleValues: simpleValues,
            checks: isNullFields,
            betweens: betweenValues,
            multipleValues: multipleValues
        });

        (async () => {
            await this.adminService.fetchCards(tupleQuery);
            this.cardList = this.adminService.adminCards;
        })();
    }


    updateBulkCards() {

        const idInputField = (document.querySelector('#input_id') as HTMLInputElement).value;

        if (idInputField !== 'empty_id') {
            return;
        }

        const attributes = Object.entries(this.selectedCard.card.value).map(item => item[0]);
        const refCard = this.eventService.playerCardSkeleton.card.value;
        //console.log(this.cardList.map(card => card.card.value));
        //console.log(attributes);
        //console.log(refCard);
        for (let card of this.cardList.map(card => card.card.value)) {
            //console.log('Módosítatlan card: ');
            //console.log(card);
            for (const attribute of attributes) {
                const attributeInputField = (document.querySelector(`#input_${attribute}`) as HTMLInputElement).value

                if (!attributeInputField.includes('empty') &&
                    !attributeInputField.includes('placeholder') &&
                    attributeInputField !== '' && card[`${attribute}`].value !== attributeInputField) {
                    //console.log('Nem egyezés');
                    card[`${attribute}`].value = attributeInputField;
                }
            }
            //console.log('Módosított card: ');
            //console.log(card);
            this.eventService.updateCard(card);
        }
    }


    resetCardList() {
        this.cardList = [];
        this.selectedCard = this.eventService.playerCardSkeleton;
    }


    getAllCard() {

        return this.http.get(this.url);
    }


    toggleSearchFields() {

        this.searchFieldsShow = !this.searchFieldsShow;
    }


    toggleCheckFields() {

        this.toggleCheckField = !this.toggleCheckField;
    }


    cardPropertiesExtractor() {

        if (Object.keys(this.selectedCard).length === 0) {
            return;
        }

        const playerCardProps: any = Object.entries(this.selectedCard);
        const cardProps = Object.entries((playerCardProps[1][1]).value);

        for (const prop of cardProps.values()) {

            const [identifier, dataObject] = prop;

            this.initAllProps.cardProps.push({
                identifier: identifier,
                name: (dataObject as any).name,
                value: (dataObject as any).value
            });
        }

        for (const prop of playerCardProps.values()) {

            const [identifier, dataObject] = prop;

            if (identifier === 'card' || identifier === 'id') {
                continue;
            }

            this.initAllProps.playerCardProps.push({
                identifier: identifier,
                name: (dataObject as any).name,
                value: (dataObject as any).value
            });
        }
    }
}
