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
    this.router.navigate(['challenges']);
  }
}
