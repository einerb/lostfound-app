import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Reference } from "../shared/interfaces/reference";
import { Endpoint } from "../shared/api/endpoints";
import { GlobalService } from "./global.service";

@Injectable({
  providedIn: "root",
})
export class ReferenceService {
  constructor(private globalService: GlobalService) {}

  public getAll(id: any): Observable<any> {
    return this.globalService.get(Endpoint.REFERENCES.ALL(id)).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public create(reference: Reference) {
    return this.globalService.post(Endpoint.REFERENCES.CREATE, reference).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public changeState(reference: Reference, data: any) {
    return this.globalService
      .put(Endpoint.ACCESSORIES.CHANGESTATE(reference._id), data)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
