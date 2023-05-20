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

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, AfterViewInit {

	@ViewChild('manufacturerDiv', { static: true }) manufacturerDiv!: ElementRef;
	@Input() baseCard!: BaseCard;
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
		const manufacturerDiv = document.querySelector(`#card_${this.cssEscape(this.baseCard.id)}`) as HTMLDivElement;
		let fontSize = this.fontSize;
		while (manufacturerDiv.scrollWidth > manufacturerDiv.offsetWidth
		|| manufacturerDiv.scrollHeight > manufacturerDiv.offsetHeight) {
			fontSize--;
			manufacturerDiv.style.fontSize = fontSize + "px";
		}
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
		document.querySelector(`#card_${CSS.escape(this.baseCard.id)}`)?.classList.toggle('flipped');
		document.querySelector(`#flip_button_${CSS.escape(this.baseCard.id)}`)?.classList.toggle('flipped');
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
		this.baseCard.acceleration,
		this.baseCard.topSpeed,
		this.baseCard.engineCapacity,
		this.baseCard.maxTorque,
		this.baseCard.weight,
		this.baseCard.fuelTankCapacity,
		this.baseCard.groundClearance,
	  ];
	}

	iiTabDatas() {
	  return [
		this.baseCard.year,
		this.baseCard.country,
		this.baseCard.driveWheel,
		this.baseCard.fuelType,
		this.baseCard.abs,
		this.baseCard.tractionControl,
	  ];
	}

	iiiTabDatas() {
	  return [
		this.baseCard.body,
		this.baseCard.doors,
		this.baseCard.seats,
		this.baseCard.length,
		this.baseCard.width,
		this.baseCard.height,
	  ];
	}

	ivTabDatas() {
	  return [
		this.baseCard.year
	  ];
	}

}
