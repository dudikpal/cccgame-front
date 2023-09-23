import { Component } from '@angular/core';
import {MainService} from "../../services/main.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {

  constructor(
      public mainService: MainService,
      private router: Router
  ) {
  }

  gotoRounds() {
    if (this.mainService.result.player > this.mainService.result.opponent) {
      this.mainService.actualRound.done = true;
      this.mainService.actualChallenge.rounds.shift();
      // db-be is le kell menteni az egész challengest
    }
    this.router.navigate(['challenges']);
  }
}
