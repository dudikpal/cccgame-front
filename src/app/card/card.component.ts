import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {


  flipCheck = 0;

  rotateCards() {
    if (this.flipCheck === 0) {
      document.getElementById("front-2")?.classList.add("showGreen");
      document.getElementById("back-2")?.classList.add("showRed");

      document.getElementById("front-1")?.classList.add("showGreen");
      document.getElementById("back-1")?.classList.add("showRed");

      this.flipCheck = 1;
    } else {
      document.getElementById("front-2")?.classList.remove("showGreen");
      document.getElementById("back-2")?.classList.remove("showRed");

      document.getElementById("front-1")?.classList.remove("showGreen");
      document.getElementById("back-1")?.classList.remove("showRed");

      this.flipCheck = 0;

    }
  }

}
