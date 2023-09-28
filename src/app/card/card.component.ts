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
		//this.autoSizeText();
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
		this.playerCard.acceleration,
		this.playerCard.topSpeed,
		this.playerCard.baseCard.engineCapacity,
		this.playerCard.baseCard.maxTorque,
		this.playerCard.weight,
		this.playerCard.baseCard.fuelTankCapacity,
		this.playerCard.groundClearance,
	  ];
	}

	iiTabDatas() {
	  return [
		this.playerCard.baseCard.year,
		this.playerCard.baseCard.country,
		this.playerCard.baseCard.driveWheel,
		this.playerCard.baseCard.fuelType,
		this.playerCard.baseCard.abs,
		this.playerCard.baseCard.tractionControl,
	  ];
	}

	iiiTabDatas() {
	  return [
		this.playerCard.baseCard.body,
		this.playerCard.baseCard.doors,
		this.playerCard.baseCard.seats,
		this.playerCard.baseCard.length,
		this.playerCard.width,
		this.playerCard.height,
	  ];
	}

	ivTabDatas() {
	  return [
		this.playerCard.baseCard.year
	  ];
	}


}
