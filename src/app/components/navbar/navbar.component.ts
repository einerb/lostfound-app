import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public navbar: boolean;
  public token;

  constructor(public router: Router, private globalService: GlobalService) {
  }

  ngOnInit() {
    this.token = this.globalService.getDecodedToken();
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
