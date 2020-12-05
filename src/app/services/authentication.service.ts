import jwt_decode from "jwt-decode";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

import { Api } from "../shared/api/api";
import { GlobalService } from "./global.service";
import { Login } from "../shared/interfaces/login";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  public redirectUrl: string;

  constructor(private globalService: GlobalService, private router: Router) {}

  /**
   * @description realizar login
   * @returns Observable <any>
   */
  public login(data: Login): Observable<any> {
    return this.globalService
      .post(Api.Endpoints.USERS.LOGIN, {
        email: data.email,
        password: data.password,
      })
      .pipe(
        map((res) => {
          localStorage.setItem("token", res["token"]);

          return res;
        })
      );
  }

  public isLoggedIn() {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    }
    return false;
  }

  public getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  public logout() {
    localStorage.clear();

    this.router.navigate(["/login"]);
  }
}
