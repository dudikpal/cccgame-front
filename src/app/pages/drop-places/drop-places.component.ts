import { Component } from '@angular/core';
import {MainService} from "../../services/main.service";
import {CdkDragDrop, copyArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-drop-places',
  templateUrl: './drop-places.component.html',
  styleUrls: ['./drop-places.component.css']
})
export class DropPlacesComponent {

  selectedCards = this.mainService.playerCards;
  nestedArray = this.mainService.playerCards;
  idList: any[] = [];
  //selectedCard1 = this.mainService.selectedCard1;
  selectedCard1 = [JSON.parse('{"id":"64837db4a4606e7e46c81951","baseCard":{"id":"c_1993_fiat-coupe-fa-175-2.0-20v-154hp-7278","rq":0,"tags":null,"level":null,"manufacturer":"Fiat","type":"Coupe 2.0 20V","country":"N/A","body":"Coupe","driveWheel":"FWD","fuelType":"Petrol","abs":"yes","tractionControl":"N/A","imageUrl":"assets/img/cars/fiat-coupe-fa-175-2.0-20v-154hp-7278.webp","logoURL":"placeholder.png","carPageUrl":"https://www.auto-data.net/en/fiat-coupe-fa-175-2.0-20v-154hp-7278","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":1993,"doors":2,"cornering":71,"seats":4,"fuelTankCapacity":63,"engineCapacity":1998,"powerKW":114,"powerHP":154,"maxTorque":186,"topSpeed":215,"weight":1270,"length":4250,"width":1768,"height":1355,"groundClearance":-1,"acceleration":8.4,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.54,"updatedAt":1685308533.545,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":1270,"topSpeed":215,"acceleration":8.4,"powerHP":154,"width":1768,"height":1355,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.55,"updatedAt":1686338996.55}')];
  //selectedCard2 = this.mainService.selectedCard2;
  selectedCard2 = [JSON.parse('{"id":"64837db4a4606e7e46c81952","baseCard":{"id":"c_2021_cupra-leon-2.0-tsi-evo-300hp-dsg-42357","rq":0,"tags":null,"level":null,"manufacturer":"Cupra","type":"Leon 2.0 TSI EVO","country":"N/A","body":"Hatchback","driveWheel":"FWD","fuelType":"Petrol","abs":"yes","tractionControl":"N/A","imageUrl":"assets/img/cars/cupra-leon-2.0-tsi-evo-300hp-dsg-42357.webp","logoURL":"placeholder.png","carPageUrl":"https://www.auto-data.net/en/cupra-leon-2.0-tsi-evo-300hp-dsg-42357","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":2021,"doors":5,"cornering":71,"seats":5,"fuelTankCapacity":50,"engineCapacity":1984,"powerKW":223,"powerHP":300,"maxTorque":400,"topSpeed":250,"weight":1490,"length":4398,"width":1799,"height":1442,"groundClearance":-1,"acceleration":5.7,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.595,"updatedAt":1685308533.595,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":1490,"topSpeed":250,"acceleration":5.7,"powerHP":300,"width":1799,"height":1442,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.602,"updatedAt":1686338996.602}')];
  //selectedCard3 = this.mainService.selectedCard3;
  selectedCard3 = [JSON.parse('{"id":"64837db4a4606e7e46c81953","baseCard":{"id":"c_1976_lotus-esprit-2.2-i-turbo-231hp-8302","rq":0,"tags":null,"level":null,"manufacturer":"Lotus","type":"Esprit 2.2 i Turbo","country":"N/A","body":"Coupe","driveWheel":"RWD","fuelType":"Petrol","abs":"yes","tractionControl":"N/A","imageUrl":"assets/img/cars/lotus-esprit-2.2-i-turbo-231hp-8302.webp","logoURL":"placeholder.png","carPageUrl":"https://www.auto-data.net/en/lotus-esprit-2.2-i-turbo-231hp-8302","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":1976,"doors":2,"cornering":71,"seats":2,"fuelTankCapacity":73,"engineCapacity":2174,"powerKW":172,"powerHP":231,"maxTorque":295,"topSpeed":250,"weight":1270,"length":4330,"width":1860,"height":1150,"groundClearance":-1,"acceleration":5.5,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.606,"updatedAt":1685308533.606,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":1270,"topSpeed":250,"acceleration":5.5,"powerHP":231,"width":1860,"height":1150,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.605,"updatedAt":1686338996.605}')];
  //selectedCard4 = this.mainService.selectedCard4;
  selectedCard4 = [JSON.parse('{"id":"64837db4a4606e7e46c81954","baseCard":{"id":"c_2001_rover-75-tourer-2.0-v6-150hp-11650","rq":0,"tags":null,"level":null,"manufacturer":"Rover","type":"75 2.0 V6","country":"N/A","body":"Estate","driveWheel":"FWD","fuelType":"Petrol","abs":"yes","tractionControl":"N/A","imageUrl":"assets/img/cars/rover-75-tourer-2.0-v6-150hp-11650.webp","logoURL":"placeholder.png","carPageUrl":"https://www.auto-data.net/en/rover-75-tourer-2.0-v6-150hp-11650","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":2001,"doors":5,"cornering":71,"seats":5,"fuelTankCapacity":65,"engineCapacity":1997,"powerKW":111,"powerHP":150,"maxTorque":185,"topSpeed":201,"weight":1505,"length":4792,"width":1778,"height":1424,"groundClearance":-1,"acceleration":10.2,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.616,"updatedAt":1685308533.616,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":1505,"topSpeed":201,"acceleration":10.2,"powerHP":150,"width":1778,"height":1424,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.61,"updatedAt":1686338996.61}')];
  //selectedCard5 = this.mainService.selectedCard5;
  selectedCard5 = [JSON.parse('{"id":"64837db4a4606e7e46c81955","baseCard":{"id":"c_1955_bmw-isetta-250-12hp-44635","rq":0,"tags":null,"level":null,"manufacturer":"BMW","type":"Isetta 250","country":"N/A","body":"Quadricycle","driveWheel":"RWD","fuelType":"Petrol","abs":"N/A","tractionControl":"N/A","imageUrl":"assets/img/cars/bmw-isetta-250-12hp-44635.webp","logoURL":"placeholder.png","carPageUrl":"https://www.auto-data.net/en/bmw-isetta-250-12hp-44635","objectPositionHorizontal":"center","objectPositionVertical":"","objectWidth":"100%","objectHeight":"100%","year":1955,"doors":1,"cornering":71,"seats":2,"fuelTankCapacity":13,"engineCapacity":245,"powerKW":8,"powerHP":12,"maxTorque":14,"topSpeed":85,"weight":370,"length":2355,"width":1380,"height":1340,"groundClearance":-1,"acceleration":-1,"gear1st":-1,"gear2nd":-1,"gear3rd":-1,"gear4th":-1,"gear5th":-1,"gear6th":-1,"finalDrive":-1,"createdAt":1685308533.625,"updatedAt":1685308533.626,"isPrizeCard":null,"value":null},"tunings":{"body":0,"engine":0,"cornering":0},"weight":370,"topSpeed":85,"acceleration":-1,"powerHP":12,"width":1380,"height":1340,"cornering":71,"groundClearance":-1,"win":null,"loss":null,"value":null,"createdAt":1686338996.614,"updatedAt":1686338996.614}')];

  constructor(
      private mainService: MainService
  ) {
  }

  onDrop(event: CdkDragDrop<any>) {
    console.log(event.item.data);
    const cardId = event.item.data.id;
    /*const cardName = event.previousContainer.data[event.previousIndex].baseCard.id;
    const card = document.querySelector(`#card_${CSS.escape(cardId)}`);
    card!.classList.add('disabled');*/
    const cardIndex = this.selectedCards.findIndex((card: { id: any; }) => card.id === cardId);
    copyArrayItem(this.selectedCards,
        event.container.data,
        cardIndex,
        0);
    /*console.log(event.container.id);
    console.log(cardIndex);
    console.log(this.selectedCard1);
    console.log(this.mainService.selectedCard1);
    console.log(this.selectedCard2);
    console.log(this.mainService.selectedCard2);
    console.log(this.selectedCard3);
    console.log(this.mainService.selectedCard3);
    console.log(this.selectedCard4);
    console.log(this.mainService.selectedCard4);
    console.log(this.selectedCard5);
    console.log(this.mainService.selectedCard5);*/
  }
}
