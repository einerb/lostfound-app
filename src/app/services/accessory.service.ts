import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Accessory } from "../shared/interfaces/accessory";
import { Endpoint } from "../shared/api/endpoints";
import { GlobalService } from "./global.service";
import { Photo } from "../shared/interfaces/photo";

@Injectable({
  providedIn: "root",
})
export class AccessoryService {
  constructor(private globalService: GlobalService) {}

  public getAll(): Observable<any> {
    return this.globalService.get(Endpoint.ACCESSORIES.BASE).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public getAllWithPhotos(accessory: Accessory): Observable<any> {
    return this.globalService.get(Endpoint.ACCESSORIES.PHOTOS(accessory)).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public getAPhotoById(photo: Photo): Observable<any> {
    return this.globalService.get(Endpoint.ACCESSORIES.PHOTO(photo)).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public getById(id: Accessory) {
    return this.globalService.get(Endpoint.ACCESSORIES.BASE + "/" + id).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public create(id: string, accessory: Accessory) {
    return this.globalService
      .post(Endpoint.ACCESSORIES.CREATE(id), accessory)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public upload(id: string, photo) {
    return this.globalService.post(Endpoint.ACCESSORIES.UPLOAD(id), photo).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public update(accessory: Accessory, data: any) {
    return this.globalService
      .put(Endpoint.ACCESSORIES.UPDATE(accessory._id), data)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public changeState(accessory: Accessory, data: any) {
    return this.globalService
      .put(Endpoint.ACCESSORIES.CHANGESTATE(accessory._id), data)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public delete(accessory: Accessory) {
    return this.globalService
      .delete(Endpoint.ACCESSORIES.DELETE(accessory._id))
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
