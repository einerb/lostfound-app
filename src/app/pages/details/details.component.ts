import Swal from "sweetalert2";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

import { Accessory } from "src/app/shared/interfaces/accessory";
import { Photo } from "src/app/shared/interfaces/photo";
import { GlobalService, AccessoryService } from "src/app/services";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  public id;
  public accessory: Accessory;
  public loading: boolean = true;
  public photos: Photo[] = [];
  public token;

  constructor(
    private accessoryService: AccessoryService,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.globalService.getDecodedToken();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get("id");
    });
    this.getInfoAccessory(this.id);
  }

  private getInfoAccessory(accessory) {
    this.accessoryService.getById(accessory).subscribe(
      (res) => {
        console.log(res.data);
        
        this.accessory = res.data;
        this.photos = res.data.photos;
        this.loading = false;
      },
      (err) => this.onFailure(err)
    );
  }

  private onFailure(err) {
    this.loading = false;
    Swal.fire({
      icon: "error",
      title: "Not Found",
      text: err.message,
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `/profile/${this.token.sub}`;
        this.router.navigateByUrl(url);
      }
    });
  }
}
