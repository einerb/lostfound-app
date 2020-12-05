import { Injectable } from "@angular/core";

import { GlobalService, AuthenticationService } from "./index";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  constructor(
    private globalService: GlobalService,
    private authService: AuthenticationService
  ) {}

  public isAdmin(): boolean {
    const token = this.globalService.getToken();
    const tokenInfo = this.authService.getDecodedAccessToken(token);
    const userRole = tokenInfo.role;

    if (tokenInfo !== null && tokenInfo !== undefined) return userRole === true;
    return false;
  }
}
