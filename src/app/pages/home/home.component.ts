import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

	constructor(
		private router: Router
	) {
	}

	ngOnInit(): void {

	}

	toGarage() {
		this.router.navigate(['/garage']);
	}

	autoSizeText() {
		const elements = document.querySelectorAll('.resize');

		if (elements.length === 0) {
			return;
		}

		elements.forEach((value: Element) => {
			const el = value as HTMLElement;
			const resizeText = () => {
				const elFontSize = parseFloat(getComputedStyle(el).fontSize);
				const elNewFontSize = (elFontSize - 1) + 'px';
				el.style.fontSize = elNewFontSize;
			};

			while (el.scrollHeight > el.offsetHeight) {
				resizeText();
			}
		});
	}
}
