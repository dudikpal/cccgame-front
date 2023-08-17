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

	pairedCards: { [key: string]: any } = {
		1: this.mainService.pairedCard1,
		2: this.mainService.pairedCard2,
		3: this.mainService.pairedCard3,
		4: this.mainService.pairedCard4,
		5: this.mainService.pairedCard5

	};

	constructor(
		private mainService: MainService,
		private router: Router
	) {
	}

	onDrop(event: CdkDragDrop<any>) {
		if (!event.previousContainer.id.startsWith(event.container.id.substring(0, event.container.id.length - 1))) {
			const cardId = event.item.data.id;
			const oldIndex = Number(event.previousContainer.id.match(/(\d)/g));
			const newIndex = Number(event.container.id.match(/(\d)/g));
			this.pairedCards[newIndex] = event.item.data;
			this.dropPlacesComponent.selectedCards[oldIndex] = this.mainService.playerCardSkeleton;
		}

		//console.log(event.previousContainer.data[event.previousIndex].id);
		//const cardName = event.previousContainer.data[event.previousIndex].baseCard.id;
		//const card = document.querySelector(`#card_${CSS.escape(cardId)}`);
		//console.log(cardId);
		/*transferArrayItem(event.item.data,
			event.container.data,
			0,
			0);*/
	}

	pairCards() {
		if (this.mainService.dropPlacesFilled(this.pairedCards)) {
			for (let i = 1; i <= 5; i++) {
				this.mainService.pairedCards[i] = this.pairedCards[i];
			}
			this.router.navigate(['/races']);
		} else {
			alert('Need to select all 5 cards.');
		}
	}
}
