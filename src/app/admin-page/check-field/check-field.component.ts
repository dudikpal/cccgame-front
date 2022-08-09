import {Component, Input, OnInit} from '@angular/core';
import {InitProps} from "../admin-page.component";

@Component({
  selector: 'app-check-field',
  templateUrl: './check-field.component.html',
  styleUrls: ['./check-field.component.css']
})
export class CheckFieldComponent implements OnInit {

    @Input() initProps!: InitProps[];

  constructor() { }

  ngOnInit(): void {
  }

  isSelected(button: any) {
      //console.log(button.currentTarget.getAttribute('aria-pressed'))
  }

}
