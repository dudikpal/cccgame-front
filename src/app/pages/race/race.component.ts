import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {PlayerCard} from "../../models/PlayerCard";

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit, OnChanges{

  @Input() race!: any;

  ngOnChanges(): void {

  }

  ngOnInit(): void {
  }



}
