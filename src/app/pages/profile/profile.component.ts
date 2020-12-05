import Swal from "sweetalert2";
import { Component, OnInit } from "@angular/core";
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from "@angular/platform-browser";
import { MatDialog, MatTabChangeEvent } from "@angular/material";

import {
  AccessoryService,
  ReferenceService,
  GlobalService,
  UserService,
} from "../../services/index";
import { User } from "../../shared/interfaces/user";
import { Accessory } from "../../shared/interfaces/accessory";
import { Photo } from "src/app/shared/interfaces/photo";
import { ModalAddComponent } from "./modal-add/modal-add.component";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { ModalUploadComponent } from "./modal-upload/modal-upload.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  public photos = [
    {
      src: "../../../assets/profile/1.jpeg",
    },
    {
      src: "../../../assets/profile/2.jpeg",
    },
    {
      src: "../../../assets/profile/3.jpeg",
    },
    {
      src: "../../../assets/profile/4.jpg",
    },
    {
      src: "../../../assets/profile/5.jpeg",
    },
    {
      src: "../../../assets/profile/6.jpeg",
    },
    {
      src: "../../../assets/profile/7.jpeg",
    },
    {
      src: "../../../assets/profile/8.jpeg",
    },
    {
      src: "../../../assets/profile/9.jpeg",
    },
    {
      src: "../../../assets/profile/10.jpeg",
    },
  ];
  public accessories: Accessory[] = [];
  public panelOpenState = false;
  public token;
  public user: User;
  public id;

  private currentImage: any;

  constructor(
    private accessoryService: AccessoryService,
    private referenceService: ReferenceService,
    private globalService: GlobalService,
    private userService: UserService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.currentImage = this.updateRandomImage();
  }

  ngOnInit() {
    this.token = this.globalService.getDecodedToken();
    this.getInfoUser(this.token, 1);

    setInterval(() => {
      this.currentImage = this.updateRandomImage();
    }, 60000);
  }

  public addAccessory() {
    this.dialog
      .open(ModalAddComponent, {
        width: "650px",
        height: "400px",
        disableClose: true,
        data: { accessory: new Accessory() },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) this.getInfoUser(this.token, 1);
      });
  }

  public editAccessory(accessory) {
    this.dialog
      .open(ModalAddComponent, {
        width: "650px",
        height: "600px",
        disableClose: true,
        data: { accessory: accessory },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) this.getInfoUser(this.token, 1);
      });
  }

  public foundState(id) {
    this.accessoryService.changeState(id, { state: "found" }).subscribe(
      (res) => {
        this.onSuccessFound();
      },
      (err) => {
        this.onFailure(err);
      }
    );
  }

  public reportState(id) {
    this.accessoryService.changeState(id, { state: "lost" }).subscribe(
      (res) => {
        this.onSuccessReport();
      },
      (err) => {
        this.onFailure(err);
      }
    );
  }

  public getImage() {
    return this.currentImage.src;
  }

  public onDelete(id) {
    Swal.fire({
      title: "Está seguro?",
      text: "Sí elimina el registro no lo podrá recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, deseo eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        this.accessoryService.delete(id).subscribe(
          (res) => {},
          (err) => this.onFailure(err)
        );
        this.onSuccessRemove();
      }
    });
  }

  public tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    if (tabChangeEvent.index === 0) {
      this.getInfoUser(this.token, 1);
    } else if (tabChangeEvent.index === 1) {
      this.getInfoUser(this.token, 2);
    } else {
      this.getInfoUser(this.token, 3);
    }
  };

  public uploadPhoto(accessory) {
    this.dialog
      .open(ModalUploadComponent, {
        width: "650px",
        height: "300px",
        disableClose: true,
        data: accessory,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) this.getInfoUser(this.token, 1);
      });
  }

  private getInfoUser(user, state?: number) {
    this.userService.getById(user).subscribe((res) => {
      this.user = res.data;

      switch (state) {
        case 1:
          this.accessories = res.data.accessories.filter(
            (res) => res.state === "normal"
          );
          break;
        case 2:
          this.accessories = res.data.accessories.filter(
            (res) => res.state === "lost"
          );
          break;
        default:
          this.accessories = res.data.accessories.filter(
            (res) => res.state === "found"
          );
      }
    });
  }

  private onSuccessFound() {
    Swal.fire({
      icon: "success",
      title: "Enhorabuena!",
      text: "Nos alegra que haya podido encontrar su objeto perdido.",
    }).then((result) => {
      if (result.isConfirmed) {
        this.getInfoUser(this.token, 2);
      }
    });
  }

  private onSuccessRemove() {
    Swal.fire({
      icon: "success",
      title: "Enhorabuena!",
      text: "El objeto se ha eliminado exitosamente!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.getInfoUser(this.token, 1);
      }
    });
  }

  private onSuccessReport() {
    Swal.fire({
      icon: "success",
      title: "Enhorabuena!",
      text:
        "El objeto se ha reportado como perdido. Los usuarios que encuentren el objeto reportado, te notificarán a través de una referencia. Deseamos que lo que encuentres pronto!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.getInfoUser(this.token, 1);
      }
    });
  }

  private onFailure(err) {
    Swal.fire({
      icon: "error",
      title: "Not Found",
      text: err.message,
    }).then((result) => {
      if (result.isConfirmed) {
      }
    });
  }

  private updateRandomImage() {
    const r = Math.floor(Math.random() * (this.photos.length - 1)) + 0;
    return this.photos[r];
  }
}
