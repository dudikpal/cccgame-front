import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {

  constructor(
      private router: Router
  ) { }

  ngOnInit(): void {
  }

    toFightTable() {
      console.log('navigate előtt');
        this.router.navigate(['fight']);
    }
}
