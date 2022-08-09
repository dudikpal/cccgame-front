import {Component, Input, OnInit} from '@angular/core';
import {InitProps} from "../admin-page.component";

@Component({
  selector: 'app-search-fields',
  templateUrl: './search-fields.component.html',
  styleUrls: ['./search-fields.component.css']
})
export class SearchFieldsComponent implements OnInit {

    @Input() initProps!: InitProps[];

  constructor() { }

  ngOnInit(): void {
  }

}
