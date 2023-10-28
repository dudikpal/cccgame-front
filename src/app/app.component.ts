import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MainService} from "./services/main.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'cccgame-front';

	constructor(
		private router: Router,
		private activeRoute: ActivatedRoute,
		private mainService: MainService
	) {
	}

	ngOnInit(): void {
		//this.mainService.getPlayerCardSkeleton();
		//this.mainService.getPlayerCards();
	}


	toAdminPage() {

		this.router.navigate(['admin'], {relativeTo: this.activeRoute});
	}

	toHome() {
		this.router.navigate(['/home']);
	}

	getCardsFromDB() {
		this.mainService.getPlayerCards();
	}
}
