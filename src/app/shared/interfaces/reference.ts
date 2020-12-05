import { Accessory } from "./accessory";
import { User } from "./user";

export class Reference {
  public _id: string;
  public user: User;
  public accessory: Accessory;
  public details: string;
  public state: boolean;

  constructor(item?: any) {
    this._id = item && item._id ? item._id : null;
    this.user = item && item.user ? item.user : null;
    this.accessory = item && item.accessory ? item.accessory : null;
    this.details = item && item.details ? item.details : "";
    this.state = item && item.state ? item.state : null;
  }
}
