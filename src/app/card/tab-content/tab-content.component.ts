import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-tab-content',
    templateUrl: './tab-content.component.html',
    styleUrls: ['./tab-content.component.css']
})
export class TabContentComponent implements OnInit {

    @Input() datas: any;

    constructor() {
    }

    ngOnInit(): void {


    }

    isNumber(num: any) {

        return typeof num === 'number';
    }
}
