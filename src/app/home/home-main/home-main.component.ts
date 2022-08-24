import { Component, OnInit } from '@angular/core';
import {HomeComponent} from "../home.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {

  centerTiles = [
    {text: 'One', cols: 2, rows: 1, color: '#142A5C', click: 'garage', image: 'https://i.stack.imgur.com/cDxxV.jpg?s=64&g=1'},
    {text: 'My garage', cols: 1, rows: 1, color: '#B7A0E8', click: 'garage', image: '../assets/img/mygarage.webp'},
    {text: 'Three', cols: 1, rows: 2, color: '#FF0000', click: 'garage', image: 'https://i.stack.imgur.com/cDxxV.jpg?s=64&g=1'},
    {text: 'Four', cols: 3, rows: 1, color: '#D9EDD9', click: 'garage', image: 'https://i.stack.imgur.com/cDxxV.jpg?s=64&g=1'},
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(page: string) {
    new HomeComponent(this.router).navigate(page);
  }

}
