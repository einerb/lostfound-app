import { Component, OnInit } from "@angular/core";

import { Accessory } from "../../shared/interfaces/accessory";
import { AccessoryService, GlobalService } from "../../services/index";
import { Photo } from "src/app/shared/interfaces/photo";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public accessories: Accessory[] = [];
  public photoPrimary: Photo;
  public token;
  public searchPipe = "";

  constructor(
    private accessoryService: AccessoryService,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    this.token = this.globalService.getDecodedToken();
    this.getInfoAccessory();
  }

  private getInfoAccessory() {
    this.accessoryService.getAll().subscribe((res) => {
      this.accessories = res.status.filter((res) => res.state === "lost");
    });
  }
}
