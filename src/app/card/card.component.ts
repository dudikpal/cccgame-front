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
import {CardFieldNames} from "../models/CardFieldNames";

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

	getAllTabs() {
		return [this.iTabDatas(), this.iiTabDatas(), this.iiiTabDatas(), this.ivTabDatas(), this.vTabDatas()];
	}

	iTabDatas() {
	  return [
		  {name: CardFieldNames.getFieldName('acceleration'), value: this.playerCard.acceleration},
		  {name: CardFieldNames.getFieldName('topSpeed'), value: this.playerCard.topSpeed},
		  {name: CardFieldNames.getFieldName('weight'), value: this.playerCard.weight},
		  {name: CardFieldNames.getFieldName('body'), value: this.playerCard.baseCard.body},
		  {name: CardFieldNames.getFieldName('groundClearance'), value: this.playerCard.groundClearance},
		  {name: CardFieldNames.getFieldName('driveWheel'), value: this.playerCard.baseCard.driveWheel},
	  ];
	}

	iiTabDatas() {
	  return [
		  {name: CardFieldNames.getFieldName('year'), value: this.playerCard.baseCard.year},
		  {name: CardFieldNames.getFieldName('country'), value: this.playerCard.baseCard.country},
		  {name: CardFieldNames.getFieldName('fuelType'), value: this.playerCard.baseCard.fuelType},
		  {name: CardFieldNames.getFieldName('fuelTankCapacity'), value: this.playerCard.baseCard.fuelTankCapacity},
		  {name: CardFieldNames.getFieldName('abs'), value: this.playerCard.baseCard.abs},
		  {name: CardFieldNames.getFieldName('tractionControl'), value: this.playerCard.baseCard.tractionControl},
	  ];
	}

	iiiTabDatas() {
	  return [
		  {name: CardFieldNames.getFieldName('doors'), value: this.playerCard.baseCard.doors},
		  {name: CardFieldNames.getFieldName('seats'), value: this.playerCard.baseCard.seats},
		  {name: CardFieldNames.getFieldName('length'), value: this.playerCard.baseCard.length},
		  {name: CardFieldNames.getFieldName('width'), value: this.playerCard.width},
		  {name: CardFieldNames.getFieldName('height'), value: this.playerCard.height},
	  ];
	}

	ivTabDatas() {
	  return [
		  {name: CardFieldNames.getTuningFieldName('body'), value: this.playerCard.tunings.body},
		  {name: CardFieldNames.getTuningFieldName('engine'), value: this.playerCard.tunings.engine},
		  {name: CardFieldNames.getTuningFieldName('cornering'), value: this.playerCard.tunings.cornering},
	  ];
	}

	vTabDatas() {
		return [
			{name: CardFieldNames.getFieldName('tags'), value: this.playerCard.baseCard.tags},
		];
	}
}
