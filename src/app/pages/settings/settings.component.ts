import Swal from "sweetalert2";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  MAT_DATE_LOCALE,
  DateAdapter,
  MAT_DATE_FORMATS,
} from "@angular/material/core";
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from "@angular/material-moment-adapter";

import { City } from "src/app/shared/data/city.data";
import { DATE_FORMAT } from "src/app/shared/utils/moment-format.util";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GlobalService, UserService } from "../../services/index";
import { ModalDonateComponent } from "./modal-donate/modal-donate.component";
import { Occupation } from "src/app/shared/data/occupation.data";
import { User } from "../../shared/interfaces/user";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "es" },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
  ],
})
export class SettingsComponent implements OnInit {
  public cities = City;
  public hidePwd: boolean;
  public loading = false;
  public occupations = Occupation;
  public updateForm: FormGroup;
  public user: User;
  public token;

  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.token = this.globalService.getDecodedToken();
    this.getInfoUser(this.token);
  }

  get f() {
    return this.updateForm.controls;
  }

  public donate(): void {
    this.dialog.open(ModalDonateComponent, {
      width: "400px",
      data: {
        name:
          "Estamos trabajando en estos momentos en el módulo de pagos. Gracias por apoyarnos!",
      },
    });
  }

  public onChangeStateEmail(user, $event) {
    const data = {
      emailVisible: $event.checked,
    };

    this.userService.visibleEmail(user, data).subscribe(() => {});
  }

  public onChangeStateOccupation(user, $event) {
    const data = {
      occupationVisible: $event.checked,
    };

    this.userService.visbleOccupation(user, data).subscribe(() => {});
  }

  public onChangeStatePhone(user, $event) {
    const data = {
      phoneVisible: $event.checked,
    };

    this.userService.visiblePhone(user, data).subscribe(() => {});
  }

  public onSubmit() {
    if (this.updateForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.update(this.token, this.updateForm.value).subscribe(
      (res) => {
        this.onSuccess();
      },
      (err) => this.onFailure(err)
    );
  }

  private createForm() {
    this.updateForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      occupation: [""],
      city: ["", [Validators.required]],
      address: [""],
      birthdate: ["", [Validators.required]],
      phone: [""],
    });
  }

  private getInfoUser(user) {
    this.userService.getById(user).subscribe((res) => {
      this.user = res.data;
      this.patchValue(res.data);
    });
  }

  private onFailure(err) {
    this.loading = false;

    Swal.fire({
      icon: "error",
      title: "Error de actualización",
      text:
        "La actualización no se pudo realizar con éxito. Por favor vuelva a intentarlo",
    });
  }

  private onSuccess() {
    this.loading = false;
    Swal.fire({
      title: "Actualización exitosa!",
      text: "Se actualizaron los datos de usuario.",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar",
    });
  }

  private patchValue(data) {
    this.updateForm.patchValue({
      name: data.name,
      lastname: data.lastname,
      occupation: data.occupation,
      city: data.city,
      address: data.address,
      birthdate: data.birthdate,
      phone: data.phone,
    });
  }
}
