import Swal from "sweetalert2";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";
import { delay, first } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public hidePwd: boolean;
  public loading = false;
  public loginForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.hidePwd = true;
  }

  get f() {
    return this.loginForm.controls;
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .login(this.loginForm.value)
      .pipe(first())
      .pipe(delay(1500))
      .subscribe(
        () => {
          this.onSuccess();
        },
        (err) => {
          this.onFailure(err);
        }
      );
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: [
        "",
        [
          Validators.pattern(
            /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
          ),
          Validators.required,
        ],
      ],
      password: ["", [Validators.required]],
    });
  }

  private onFailure(err) {
    this.loading = false;

    Swal.fire({
      icon: "error",
      title: "Error de sesión",
      text: "El usuario o la contraseña son incorrectas!",
    });
  }

  private onSuccess() {
    this.router.navigateByUrl("/home");
  }
}
