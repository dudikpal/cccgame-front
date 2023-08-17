import {Component, ElementRef, OnInit} from '@angular/core';
import {MainService} from "../../services/main.service";
//import {Page} from "ngx-pagination";
import {PlayerCard} from "../../models/PlayerCard";
import {Router} from "@angular/router";
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {CdkDragDrop, CdkDragExit, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
	selector: 'app-garage',
	templateUrl: './garage.component.html',
	styleUrls: ['./garage.component.css']
})
export class GarageComponent implements OnInit {

	page = 1;
	count = 0;
	itemsPerPage = 10;
	playerCards: any[] = [];
	transferringItem: string | undefined = undefined;


	constructor(
		private mainService: MainService
	) {
	}

	ngOnInit(): void {
		this.playerCards = this.mainService.playerCards;
		this.count = this.playerCards.length;
		//console.log(this.playerCards);
	}

	onDataChange(event: any) {
		this.page = event;
	}

	previous10(currentPage: number) {
		const previousPage = currentPage -= 10;
		previousPage >= 10;
	}

	/*temp(pages: Page[]) {
	  console.log(pages);
	}*/

	onWheel(event: WheelEvent) {
		(<Element>event.target).parentElement!.scrollLeft += event.deltaY;
		/*(<Element>event.target).parentElement!.scrollBy({
		  left: event.deltaY < 0 ? -30 : 30,
		});*/
		//event.preventDefault();
	}

	onDragStarted(card: any) {
		const index = this.playerCards.indexOf(card);
		//console.log(index);
		/*if (index > -1) {
		  this.playerCards.splice(index, 1);
		}*/
	}

	exited(event: CdkDragExit<string>) {
		/*const currentIdx = event.container.data.findIndex(
			(f: { id: any; }) => f.id === event.item.data.id
		);
		this.playerCards.splice(currentIdx + 1, 0, {
			...event.item.data,
			temp: true,
		});
		console.log(currentIdx);*/
		//this.transferringItem = event.item.data;
	}

	entered() {
		//this.playerCards = this.playerCards.filter((f) => !f.temp);
	}

	itemDisabled() {
		return "item.disabled";
	}
}
