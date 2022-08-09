import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-select-button',
  templateUrl: './select-button.component.html',
  styleUrls: ['./select-button.component.css']
})
export class SelectButtonComponent implements OnInit {

    @Input() cardId: any;

  constructor() { }

  ngOnInit(): void {
  }

    selectCard(id: string, event: Event) {

        event.stopPropagation();

        const card = document.querySelector('#' + id)!;
        const btn = card.querySelector(`#select_btn_${id}`)!;

        btn.classList.toggle('selected');
    }
}
