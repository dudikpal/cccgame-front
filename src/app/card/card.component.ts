import {Component, Input} from '@angular/core';
import {IBaseCard} from "../models/IBaseCard.";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() baseCard!: IBaseCard;
  manufacturerLogoUrlPrefix = environment.imgFilePrefix;
  isFlipped = false;
  s_round = '.s_round';

  constructor(
      //private eventService: EventService,
  ) {
  }


  ngOnInit(): void {
    const sRound = document.querySelectorAll(this.s_round);

    sRound.forEach((elem) => {
      elem.addEventListener('mouseenter', () => {
        document.querySelector('.b_round')?.classList.toggle('b_round_hover');
      });

      elem.addEventListener('click', () => {
        document.querySelector('.flip_box')?.classList.toggle('flipped');
        document.querySelector('.s_round')?.classList.toggle('flipped');
        //document.querySelector('.r_wrap')?.classList.toggle('flipped');
        elem.classList.add('s_round_click');
        document.querySelector('.s_arrow')?.classList.toggle('s_arrow_rotate');
        document.querySelector('.b_round')?.classList.toggle('b_round_back_hover');
      });

      elem.addEventListener('transitionend', () => {
        elem.classList.remove('s_round_click');
        elem.classList.add('s_round_back');
      });
    });
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  public generateLogoUrl(filename: string) {
    return this.manufacturerLogoUrlPrefix + filename;
  }

  public flipToFront(givenId: any) {

    let card = document.querySelector(`#${CSS.escape(givenId)}`)!;
    card.classList.remove('flipCard');
  }

  /*frontDatas() {
    return [
      this.playerCard.calculatedFields.topSpeed,
      this.playerCard.calculatedFields.acceleration,
      this.playerCard.card.value.driveWheel,
      this.playerCard.card.value.engineCapacity,
    ];
  }


  iTabDatas() {

    return [
      this.playerCard.calculatedFields.acceleration,
      this.playerCard.calculatedFields.topSpeed,
      this.playerCard.card.value.engineCapacity,
      this.playerCard.card.value.maxTorque,
      this.playerCard.calculatedFields.weight,
      this.playerCard.card.value.fuelTankCapacity,
      this.playerCard.calculatedFields.groundClearance,
    ];
  }

  iiTabDatas() {

    return [
      this.playerCard.card.value.year,
      this.playerCard.card.value.country,
      this.playerCard.card.value.driveWheel,
      this.playerCard.card.value.fuelType,
      this.playerCard.card.value.abs,
      this.playerCard.card.value.tractionControl,
    ];
  }

  iiiTabDatas() {

    return [
      this.playerCard.card.value.body,
      this.playerCard.card.value.doors,
      this.playerCard.card.value.seats,
      this.playerCard.card.value.length,
      this.playerCard.calculatedFields.width,
      this.playerCard.calculatedFields.height,
    ];
  }

  ivTabDatas() {

    return [
      this.playerCard.tunings.chassis,
      this.playerCard.tunings.engine,
      this.playerCard.tunings.cornering
    ];
  }*/
}
