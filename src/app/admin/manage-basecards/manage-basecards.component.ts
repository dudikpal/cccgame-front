import {Component, Input, OnInit} from '@angular/core';
import {AdminService} from "../../services/admin.service.";
import {MainService} from "../../services/main.service";
import {IBaseCard} from "../../models/IBaseCard.";

@Component({
    selector: 'app-manage-basecards',
    templateUrl: './manage-basecards.component.html',
    styleUrls: ['./manage-basecards.component.css']
})
export class ManageBasecardsComponent implements OnInit{

    baseCards!: IBaseCard[];
    baseCardSkeleton!: IBaseCard;

    constructor(
        private adminService: AdminService,
        private mainService: MainService
    ) {
    }

    ngOnInit(): void {
        this.adminService.getFilteredBaseCards()
            .then(() => {
                this.baseCards = this.adminService.baseCards;
        this.baseCardSkeleton = this.mainService.baseCardSkeleton;
            });
    }


    getObjectEntries(baseCard: any) {
        const re = Object.entries(baseCard);
        
        return re;
    }
}
