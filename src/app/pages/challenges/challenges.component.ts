import {Component, OnInit} from '@angular/core';
import {Round, RoundCards} from "../rounds/rounds.component";
import {MainService} from "../../services/main.service";
import {Router} from "@angular/router";

export interface Challenge {
  name: string
  rounds: Round[]
}

export interface ChallengeCards {
  name: string
  roundCards: RoundCards[]
}

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit{

  challenges!: Challenge[];
  challengeCards!: ChallengeCards[];

  constructor(
      private mainService: MainService,
      private router: Router
  ) {
  }

  ngOnInit(): void {
    this.challenges = this.mainService.getChallenges();
  }


  toRounds(challenge: Challenge) {
    // itt kell feltölteni a mainServicebe a kiválasztott challentget
    this.mainService.actualChallenge = challenge;
    this.router.navigate(['rounds']);
  }

  backToHome() {
    this.router.navigate(['home']);
  }
}
