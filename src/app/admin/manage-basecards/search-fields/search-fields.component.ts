import {Component, Input, OnInit} from '@angular/core';
import {BaseCard} from "../../../models/BaseCard";
import {AdminService} from "../../../services/admin.service.";
import {MainService} from "../../../services/main.service";

@Component({
  selector: 'app-search-fields',
  templateUrl: './search-fields.component.html',
  styleUrls: ['./search-fields.component.css']
})
export class SearchFieldsComponent implements OnInit{


  url = "http://localhost:8080/api/basecard"

  @Input() baseCardSkeleton!: BaseCard;

  constructor(
      private adminService: AdminService,
      private mainService: MainService
  ) {
  }

  ngOnInit(): void {
    //this.baseCardSkeleton = this.mainService.baseCardSkeleton;
  }



  getObjectEntries(baseCard: any) {
    return Object.entries(baseCard);
  }



}
