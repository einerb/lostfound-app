import Swal from "sweetalert2";
import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
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
import { Category } from "src/app/shared/data/category.data";
import { AccessoryService, GlobalService } from "src/app/services";
import { Accessory } from "src/app/shared/interfaces/accessory";
import { User } from "src/app/shared/interfaces/user";

@Component({
  selector: "app-modal-add",
  templateUrl: "./modal-add.component.html",
  styleUrls: ["./modal-add.component.scss"],
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
export class ModalAddComponent implements OnInit {
  public addForm: FormGroup;
  public cities = City;
  public categories = Category;
  public token;
  public accessoryDataCopy: Accessory;

  constructor(
    @Inject(MAT_DIALOG_DATA) public accessoryData: any,
    public dialogRef: MatDialogRef<ModalAddComponent>,
    private formBuilder: FormBuilder,
    private accessoryService: AccessoryService,
    private globalService: GlobalService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.accessoryDataCopy = new Accessory(
      this.accessoryData.accessory._id ? this.accessoryData.accessory : null
    );

    this.token = this.globalService.getDecodedToken();
    this.patchValue(this.accessoryData.accessory);
  }

  get f() {
    return this.addForm.controls;
  }

  public onSubmit() {
    if (this.addForm.invalid) {
      return;
    }

    if (this.accessoryDataCopy._id) {
      this.accessoryService
        .update(this.accessoryDataCopy, this.addForm.value)
        .subscribe(
          (res) => {
            this.onSuccessUpdate();
          },
          (err) => this.onFailure(err)
        );
    } else {
      this.accessoryService
        .create(this.token.sub, this.addForm.value)
        .subscribe(
          (res) => {
            this.onSuccess();
          },
          (err) => this.onFailure(err)
        );
    }
  }

  private createForm() {
    this.addForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: [""],
      lost_date: [""],
      place_date: [""],
      reward: [""],
      category: ["", [Validators.required]],
    });
  }

  private onSuccess() {
    this.dialogRef.close(true);
    Swal.fire({
      icon: "success",
      title: "Enhorabuena!",
      text:
        "El objeto se ha registrado. En el futuro puede reportarlo si se le pierde!",
    }).then((result) => {});
  }

  private onSuccessUpdate() {
    this.dialogRef.close(true);
    Swal.fire({
      icon: "success",
      title: "Enhorabuena!",
      text:
        "El objeto se ha actualizado los datos de reporte, ya puede reportarlo con toda la info!",
    }).then((result) => {});
  }

  private onFailure(err) {
    Swal.fire({
      icon: "error",
      title: "Error de registro",
      text: err.message,
    });
  }

  private patchValue(data) {
    this.addForm.patchValue({
      name: data.name,
      description: data.description,
      lost_date: data.lost_date,
      place_date: data.place_date,
      reward: data.reward,
      category: data.category,
    });
  }
}
