import {AfterViewInit, Component, Input, OnInit, Output} from '@angular/core';
import {AdminService} from "../../services/admin.service.";
import {MainService} from "../../services/main.service";
import {IBaseCard} from "../../models/IBaseCard.";

@Component({
    selector: 'app-manage-basecards',
    templateUrl: './manage-basecards.component.html',
    styleUrls: ['./manage-basecards.component.css']
})
export class ManageBasecardsComponent implements OnInit, AfterViewInit{

    baseCard!: IBaseCard;
    baseCards!: IBaseCard[];
    baseCardSkeleton!: IBaseCard;

    constructor(
        private adminService: AdminService,
        private mainService: MainService
    ) {
    }

    ngOnInit(): void {
        // ez csak a teszt idejére kell, admin page loadra betölti a card listet
        this.adminService.getFilteredBaseCards()
            .then(() => {
                this.baseCards = this.adminService.baseCards;
            });
            this.baseCardSkeleton = this.mainService.baseCardSkeleton;
            this.baseCard = this.baseCardSkeleton;

    }

    ngAfterViewInit(): void {
    }

    searchFieldsVisible(): boolean {
        return this.adminService.searchFieldsVisibility;
    }

    getSelectedCard() {
        //console.log(this.adminService.selectedCard);
        return this.adminService.selectedCard;
    }
}
