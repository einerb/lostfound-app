import Swal from "sweetalert2";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
import { Occupation } from "src/app/shared/data/occupation.data";
import { Router } from "@angular/router";
import { UserService } from "../../services/index";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
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
export class RegisterComponent implements OnInit {
  public cities = City;
  public hidePwd: boolean;
  public loading = false;
  public occupations = Occupation;
  public registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.hidePwd = true;
  }

  get f() {
    return this.registerForm.controls;
  }

  public onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.create(this.registerForm.value).subscribe(
      () => {
        this.onSuccess();
      },
      (err) => this.onFailure(err)
    );
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      occupation: [""],
      city: ["", [Validators.required]],
      address: [""],
      birthdate: ["", [Validators.required]],
      phone: [""],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
          ),
        ],
      ],
      password: ["", [Validators.required]],
    });
  }

  private onFailure(err) {
    this.loading = false;

    Swal.fire({
      icon: "error",
      title: "Error de registro",
      text:
        "El registro no se pudo realizar con éxito porque ya existe un usuario con mismo correo. Por favor vuelva a intentarlo",
    });
  }

  private onSuccess() {
    Swal.fire({
      title: "Registro exitoso!",
      text:
        "Se registró con éxito en la plataforma. Será redireccionado a la página de inicio de sesión.",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl("/login");
      }
    });
  }
}
