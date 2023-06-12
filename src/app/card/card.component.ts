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
	fontSize: number = 20;

	@ViewChild('baseCardIdElement', { static: false }) baseCardIdElement!: ElementRef;

	constructor() {
	}

	get defaultFontSize(): number {
		return this._defaultFontSize;
	}

	ngOnInit(): void {
		this.baseCard = this.playerCard.baseCard;
		//this.flexFont();
		//this.shrinkTextIntoContainer();
		//this.resizeText();
	}

	ngAfterViewInit(): void {
		/*setTimeout(() => {
			this.resizeText();
		});*/
		this.calculateFontSize();
	}

	calculateFontSize() {
		// vmiért nem kicsinít, de már megtalálja id alapján a diveket
		/*const manufacturerDiv = document.querySelector(`#card_${this.cssEscape(this.baseCard.id)}`) as HTMLDivElement;
		let fontSize = this.fontSize;
		while (manufacturerDiv.scrollWidth > manufacturerDiv.offsetWidth
		|| manufacturerDiv.scrollHeight > manufacturerDiv.offsetHeight) {
			fontSize--;
			manufacturerDiv.style.fontSize = fontSize + "px";
		}*/
	}

	private resizeText() {
		const elementWidth = this.baseCardIdElement.nativeElement.offsetWidth;
		const parentWidth = this.baseCardIdElement.nativeElement.parentElement.offsetWidth;

		while (elementWidth > parentWidth && this.fontSize > 0) {
			this.fontSize--;
			this.baseCardIdElement.nativeElement.style.fontSize = `${this.fontSize}px`;
		}

	}


	public flipCard() {
		document.querySelector(`#card_${this.playerCard.id}`)?.classList.toggle('flipped');
		document.querySelector(`#flip_button_${this.playerCard.id}`)?.classList.toggle('flipped');
	}

	cssEscape(rawString: string) {
		return CSS.escape(rawString);
	}

	// mindet összeveszi, nem csak azt ami kiléógna
	flexFont() {
		//var divs: HTMLCollectionOf<Element> = document.getElementsByClassName("manufacturer-name");
		var div: HTMLDivElement = document.querySelector("#manufacturer-div")!;
		/*for (let i = 0; i < divs.length; i++) {
			const div = divs[i] as HTMLDivElement;
			var relFontsize = div.offsetWidth * 0.05;
			div.style.fontSize = relFontsize + 'px';
		}*/
	}

	public generateLogoUrl(filename: string) {
		return this.manufacturerLogoUrlPrefix + filename;
	}



	private shrinkTextIntoContainer() {
		const manufacturerDiv = document.querySelector('#manufacturer-div') as HTMLDivElement;
		let fontSize = this.defaultFontSize;
		console.log("manufacturerDiv.scrollWidth");
		console.log(manufacturerDiv.scrollWidth);
		console.log("manufacturerDiv.offsetWidth");
		console.log(manufacturerDiv.offsetWidth);
		while (manufacturerDiv.scrollWidth > manufacturerDiv.offsetWidth
		|| manufacturerDiv.scrollHeight > manufacturerDiv.offsetHeight) {
			fontSize--;
			manufacturerDiv.style.fontSize = fontSize + "px";
			console.log("fontSize");
			console.log(fontSize);
		}
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
