import {Component, OnInit} from '@angular/core';
import {Race, RaceCards} from "../races/races.component";
import {MainService} from "../../services/main.service";
import {Router} from "@angular/router";

export interface Round {
  order: number
  races: Race[]
  done: boolean
  placedCards: {[key: string]: any}
}

export interface RoundCards {
  order: number
  racesCards: any[]
}

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.css']
})
export class RoundsComponent implements OnInit{

  rounds!: Round[];
  roundCards!: RoundCards[];

  constructor(
      private router: Router,
      private mainService: MainService
  ) {
  }

  ngOnInit(): void {
    this.rounds = this.mainService.actualChallenge.rounds;
  }

  toRaces(round: Round) {
    this.mainService.actualRound = round;
    this.router.navigate(['/choose-cards']);
  }

  backToChallenges() {
    this.router.navigate(['/challenges']);
  }
}
