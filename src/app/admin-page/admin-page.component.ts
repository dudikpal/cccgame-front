import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CardModel} from "../card/card.model";
import {EventService} from "../event.service";
import {HttpClient} from "@angular/common/http";
import {Observable, window} from "rxjs";
//import {log} from "util";
import {CardMapper} from "../card/cardMapper";
import {environment} from "../../environments/environment";

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
    initProps!: InitProps[];
    cardList!: any[];
    selectedCard: any = '';
    searchFieldsShow = false;
    toggleCheckField = false;
    url = environment.endpointPrefix + '/api/cards';
    concatenatedFilename = 'all-card';

    constructor(
        private eventService: EventService,
        private http: HttpClient,
    ) {}

    // playerCardDTO-t be kell fúzni


    ngOnInit(): void {

        this.eventService.childEventListener().subscribe(item => {

            this.selectedCard = item;
        });

        this.dataExtractor();
        //this.selectedCard = new CardModel();
    }

    deleteCard() {

        fetch(this.url + '/' + this.selectedCard.id.value, {
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
                (this.cardDTO as any)[attrName] = value.split(',');
            } else if (value.includes('-')) {
                betweenValues.push({
                    name: attrName,
                    values: [value.match(/^\d+(\.\d+)?/)![0], value.match(/(\d+\.)?\d+$/)![0]]
                });
                //(this.cardDTO as any)[attrName] = null;
                (this.cardDTO as any)[attrName] = value;
            } else if (value !== '') {
            /*console.log(attrName);
            console.log(value);*/
                simpleValues.push({
                    name: attrName,
                    values: [value]
                });
                (this.cardDTO as any)[attrName] = this.convertEmptyToNull(value);
            }
        }

        const selectedCheckFields = document.querySelectorAll('[data-check].active');
        let isNullFields = [];

        for (const checkField of Array.from(selectedCheckFields)) {
            const attrName = checkField.getAttribute('data-check')!;
            isNullFields.push(attrName);
            (this.cardDTO as any)[attrName] = null;
        }

        // in DTO just the simple values left
        const tupleQuery = JSON.stringify({
            //card: this.cardDTO,
            simpleValues: simpleValues,
            checks: isNullFields,
            betweens: betweenValues,
            multipleValues: multipleValues
        });
        /*console.log(this.cardDTO)
        const tupleQuery = this.cardDTO;*/

        console.log(tupleQuery)
        this.fetchCards(tupleQuery);
    }


    fetchCards(params: any) {

        const result = async () => {
            //const response = await fetch(this.url + '/find', {
            const response = await fetch(environment.endpointPrefix + '/api/playerCards', {
                method: "POST",
                body: params,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const jsonResponse = await response.json();
            this.cardList = jsonResponse;

            //this.cardList.sort((a, b) => a.manufacturer.value.localeCompare(b.manufacturer.value));
            console.log(this.cardList);
        };

        return result();
    }


    convertEmptyToNull(param: string) {

        if (param) {
            return param;
        }

        return null;
    }


    createCard() {

        const createdCard = new CardMapper().mapToCard(this.selectedCard);

        fetch(this.url, {
            method: "POST",
            body: createdCard,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }


    update() {

        const idInputField = (document.querySelector('#input_id') as HTMLInputElement).value;

        if (idInputField === 'empty-id') {
            this.updateBulkCards()

        } else {
            this.updateCard();
        }
    }


    updateCard(card?: any) {

        let updatedCard;

        if (card) {
            updatedCard = card;
        } else {
            updatedCard = new CardMapper().mapToCard(this.selectedCard);
        }

        fetch(this.url, {
            method: "PUT",
            body: JSON.stringify(updatedCard),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }


    updateBulkCards() {

        const attributes = Object.entries(this.selectedCard).map(item => item[0]);
        const refCard = new CardMapper().mapToCard(new CardModel());

        for (const cardModel of this.cardList) {

            let card = new CardMapper().mapToCard(cardModel);

            for (const attribute of attributes) {

                if (this.selectedCard[`${attribute}`].value !== refCard[`${attribute}`]) {

                    card[`${attribute}`] = this.selectedCard[`${attribute}`].value;
                }
            }
            this.updateCard(card);
        }
    }


    resetCardList() {
        this.cardList = [];
        this.selectedCard = new CardModel();
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


    dataExtractor() {

        const props = Object.entries(this.cardDTO);
        this.initProps = [];
        for (const prop of props.values()) {

            const [identifier, dataObject] = prop;

            this.initProps.push({
                identifier: identifier,
                name: dataObject.name,
                value: dataObject.value
            });
        }
    }
}
