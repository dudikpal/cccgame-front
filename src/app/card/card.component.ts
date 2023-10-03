import {
	AfterViewChecked,
	AfterViewInit,
	Component, ElementRef,
	Input,
	OnChanges,
	OnInit, Renderer2,
	SimpleChanges,
	ViewChild
} from '@angular/core';
import {BaseCard} from "../models/BaseCard";
import {environment} from "../../environments/environment";
import {PlayerCard} from "../models/PlayerCard";
import {MainService} from "../services/main.service";

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, AfterViewInit {

	@ViewChild('manufacturerDiv', { static: true }) manufacturerDiv!: ElementRef;
	@Input() playerCard!: PlayerCard;
	baseCard!: BaseCard;
	manufacturerLogoUrlPrefix = environment.imgFilePrefix;
	isFlipped = false;
	private _defaultFontSize = 35;
	isDisabled = false;

	@ViewChild('baseCardIdElement', { static: false }) baseCardIdElement!: ElementRef;
	private fontSize: string = '';

	constructor(
		private mainService: MainService
	) {
	}

	ngOnInit(): void {
		this.baseCard = this.playerCard.baseCard;
	}

	ngAfterViewInit(): void {
		this.autoSizeText();
	}

	toggleDisable() {
		this.isDisabled = this.mainService.isDisabled;
	}

	public flipCard() {
		document.querySelector(`#card_${this.playerCard.id}`)?.classList.toggle('flipped');
		document.querySelector(`#flip_button_${this.playerCard.id}`)?.classList.toggle('flipped');
	}

	cssEscape(rawString: string) {
		return CSS.escape(rawString);
	}

	public generateLogoUrl(filename: string) {
		return this.manufacturerLogoUrlPrefix + filename;
	}

	autoSizeText() {
		const elements = document.querySelectorAll('.resize');

		if (elements.length === 0) {
			return;
		}

		elements.forEach((value: Element) => {
			const el = value as HTMLElement;
			const resizeText = () => {
				const elFontSize = parseFloat(getComputedStyle(el).fontSize);
				const elNewFontSize = (elFontSize - 1) + 'px';
				el.style.fontSize = elNewFontSize;
				this.fontSize = elNewFontSize;
			};
				console.log('Element fontsize = ' + this.fontSize);
			/*console.log('While ');
			console.log('ScrollHeight: ' + el.scrollHeight);
			console.log('>');
			console.log('OffsetHeight: ' + el.offsetHeight);*/
			while (el.scrollHeight > el.offsetHeight) {
				resizeText();
			}
		});
	}

	/*frontDatas() {
	  return [
		this.playerCard.calculatedFields.topSpeed,
		this.playerCard.calculatedFields.acceleration,
		this.playerCard.card.value.driveWheel,
		this.playerCard.card.value.engineCapacity,
	  ];
	}*/

	iTabDatas() {
	  return [
		  {name: PlayerCard.names.acceleration, value: this.playerCard.acceleration},
		  {name: PlayerCard.names.topSpeed, value: this.playerCard.topSpeed},
		  {name: PlayerCard.names.weight, value: this.playerCard.weight},
		  {name: this.playerCard.baseCard.body, value: this.playerCard.baseCard.body},
		  {name: this.playerCard.groundClearance, value: this.playerCard.groundClearance},
		  {name: this.playerCard.baseCard.driveWheel, value: this.playerCard.baseCard.driveWheel},
	  ];
	}

	iiTabDatas() {
	  return [
		  {name: this.playerCard.baseCard.year, value: this.playerCard.baseCard.year},
		  {name: this.playerCard.baseCard.country, value: this.playerCard.baseCard.country},
		  {name: this.playerCard.baseCard.fuelType, value: this.playerCard.baseCard.fuelType},
		  {name: this.playerCard.baseCard.fuelTankCapacity, value: this.playerCard.baseCard.fuelTankCapacity},
		  {name: this.playerCard.baseCard.abs, value: this.playerCard.baseCard.abs},
		  {name: this.playerCard.baseCard.tractionControl, value: this.playerCard.baseCard.tractionControl},
	  ];
	}

	iiiTabDatas() {
	  return [
		  {name: this.playerCard.baseCard.doors, value: this.playerCard.baseCard.doors},
		  {name: this.playerCard.baseCard.seats, value: this.playerCard.baseCard.seats},
		  {name: this.playerCard.baseCard.length, value: this.playerCard.baseCard.length},
		  {name: this.playerCard.width, value: this.playerCard.width},
		  {name: this.playerCard.height, value: this.playerCard.height},
	  ];
	}

	ivTabDatas() {
	  return [
		  {name: this.playerCard.tunings, value: this.playerCard.tunings}
	  ];
	}


}
