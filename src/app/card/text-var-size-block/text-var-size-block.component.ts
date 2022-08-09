import {AfterViewInit, Component, Input, OnInit} from '@angular/core';


@Component({
    selector: 'app-text-var-size-block',
    templateUrl: './text-var-size-block.component.html',
    styleUrls: ['./text-var-size-block.component.css']
})
export class TextVarSizeBlockComponent implements OnInit, AfterViewInit {

    @Input() card!: any;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        const typeBlock = document.querySelector(`#type_${this.card.id.value}`);
        //const typeBlock = document.querySelector('[id^="type_"]');
        this.calcTypeSize(typeBlock);

    }

    calcTypeSize(element: any) {

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        let fontSize = 18;
        let fontStyle = `bolder ${fontSize}pt roboto`;
        context.font = fontStyle;
        let actualWidth = context.measureText(this.card.type.value).width;

        // ráhagyás nélkül nem húzta ki teljesen
        while (element.clientWidth + 20 < actualWidth) {

            fontSize--;
            fontStyle = `bolder ${fontSize}pt roboto`;
            context.font = fontStyle;
            actualWidth = context.measureText(this.card.type.value).width;
        }

        element.style.fontSize = `${fontSize}pt`;
    }

}
