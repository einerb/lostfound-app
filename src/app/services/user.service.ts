import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Endpoint } from "../shared/api/endpoints";
import { GlobalService } from "./global.service";
import { User } from "../shared/interfaces/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private globalService: GlobalService) {}

  public getAll(): Observable<any> {
    return this.globalService.get(Endpoint.USERS.BASE).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public getById(user: User) {
    return this.globalService.get(Endpoint.USERS.BASE + "/" + user.sub).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public create(user: User) {
    return this.globalService.post(Endpoint.USERS.REGISTER, user).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public update(user: User, data: any) {
    return this.globalService.put(Endpoint.USERS.UPDATE(user.sub), data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public visibleEmail(user: User, data: any) {
    return this.globalService.put(Endpoint.USERS.VISIBLEEMAIL(user), data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public visiblePhone(user: User, data: any) {
    return this.globalService.put(Endpoint.USERS.VISIBLEPHONE(user), data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public visbleOccupation(user: User, data: any) {
    return this.globalService
      .put(Endpoint.USERS.VISIBLEOCCUPATION(user), data)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
