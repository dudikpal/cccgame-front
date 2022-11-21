import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EventService} from "../../event.service";

@Component({
  selector: 'app-upgrade-button',
  templateUrl: './upgrade-button.component.html',
  styleUrls: ['./upgrade-button.component.css']
})
export class UpgradeButtonComponent implements OnInit {

  @Input() playerCard: any;

  constructor(
      private router: Router,
      private mainService: EventService
  ) { }

  ngOnInit(): void {
  }

  selectCard(playerCard: any, event: Event) {

    event.stopPropagation();
    const id = playerCard.id.value;
    const card = document.querySelector('#' + CSS.escape(id))!;
    const btn = card.querySelector(`#select_btn_${CSS.escape(id)}`)!;
    this.mainService.selectCardForUpgrade = this.playerCard;
    this.router.navigate(['/upgrade']);
  }

}
