import { Photo } from "./photo";
import { User } from "./user";

export class Accessory {
  public _id: string;
  public name: string;
  public description: string;
  public lost_date: Date;
  public place_date: string;
  public qr: string;
  public reward: string;
  public category: string;
  public photos: Photo;
  public user: User;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(item?: any) {
    this._id = item && item._id ? item._id : null;
    this.name = item && item.name ? item.name : "";
    this.description = item && item.description ? item.description : '';
    this.lost_date = item && item.lost_date ? item.lost_date : null;
    this.place_date = item && item.place_date ? item.place_date : '';
    this.qr = item && item.qr ? item.qr : '';
    this.reward = item && item.reward ? item.reward : '';
    this.category = item && item.category ? item.category : '';
    this.photos = item && item.photo ? item.photo : null;
  }
}
