import { Accessory } from "./accessory";

export class User {
  public sub: string;
  public name: string;
  public lastname: string;
  public occupation: string;
  public city: string;
  public address: string;
  public birthdate: Date;
  public phone: string;
  public email: string;
  public state: boolean;
  public photo: string;
  public role: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(item?: any) {
    this.sub = item && item.sub ? item.sub : "";
    this.name = item && item.name ? item.name : "";
    this.lastname = item && item.lastname ? item.lastname : "";
    this.occupation = item && item.occupation ? item.occupation : "";
    this.city = item && item.city ? item.city : "";
    this.address = item && item.address ? item.address : "";
    this.birthdate = item && item.birthdate ? item.birthdate : null;
    this.phone = item && item.phone ? item.phone : "";
    this.email = item && item.email ? item.email : "";
    this.state = item && item.state ? item.state : null;
    this.photo = item && item.photo ? item.photo : "";
    this.role = item && item.role ? item.role : null;
  }
}
