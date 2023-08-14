import {Component, ViewChild} from '@angular/core';
import {MainService} from "../../services/main.service";
import {CdkDragDrop, copyArrayItem, transferArrayItem} from "@angular/cdk/drag-drop";
import {DropPlacesComponent} from "../drop-places/drop-places.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cards-pairing',
  templateUrl: './cards-pairing.component.html',
  styleUrls: ['./cards-pairing.component.css']
})
export class CardsPairingComponent {

  @ViewChild(DropPlacesComponent) dropPlacesComponent!: DropPlacesComponent;

  pairedCards: {[key: string]: any} = {
    1 : this.mainService.pairedCard1,
    2 : this.mainService.pairedCard2,
    3 : this.mainService.pairedCard3,
    4 : this.mainService.pairedCard4,
    5 : this.mainService.pairedCard5

  };

  constructor(
      private mainService: MainService,
      private router: Router
  ) {
  }

  onDrop(event: CdkDragDrop<any>) {
    //console.log(event.previousContainer.data[event.previousIndex].id);
    const cardId = event.item.data.id;
    //const cardName = event.previousContainer.data[event.previousIndex].baseCard.id;
    //const card = document.querySelector(`#card_${CSS.escape(cardId)}`);
    //console.log(cardId);
    /*transferArrayItem(event.item.data,
        event.container.data,
        0,
        0);*/
    const dropIndex = Number(event.previousContainer.id.match(/(\d)/g));
this.pairedCards[dropIndex] = event.item.data;
this.dropPlacesComponent.selectedCards[dropIndex] = this.mainService.playerCardSkeleton;
  }

  pairCards() {
    this.mainService.pairedCard1 = this.pairedCards[1];
    this.mainService.pairedCard2 = this.pairedCards[2];
    this.mainService.pairedCard3 = this.pairedCards[3];
    this.mainService.pairedCard4 = this.pairedCards[4];
    this.mainService.pairedCard5 = this.pairedCards[5];
    this.router.navigate(['/races']);
  }
}
