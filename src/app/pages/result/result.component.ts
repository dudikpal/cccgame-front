import { Component } from '@angular/core';
import {MainService} from "../../services/main.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {

  constructor(
      public mainService: MainService
  ) {
  }
}
