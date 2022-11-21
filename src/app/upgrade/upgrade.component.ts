import {Component, Input, OnInit} from '@angular/core';
import {EventService} from "../event.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {

  selectedCard: any;

  calculatedFields: any;

  constructor(
      private mainService: EventService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.selectedCard = this.mainService.selectCardForUpgrade;
    this.calculatedFields = [];

    for (const calculatedField of this.selectedCard.calculatedFields) {
      const obj = {
        name: calculatedField.name,
        identifier: calculatedField,
        baseValue: calculatedField.value,
      };
    console.log(obj);
    }
  }


  goToHome() {
    this.router.navigate(['/home']);
  }
}
