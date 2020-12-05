import { Component, Inject, OnInit } from "@angular/core";

import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AccessoryService } from "src/app/services/accessory.service";

@Component({
  selector: "app-modal-upload",
  templateUrl: "./modal-upload.component.html",
  styleUrls: ["./modal-upload.component.scss"],
})
export class ModalUploadComponent implements OnInit {
  public uploadForm: FormGroup;
  massiveFileHasLoaded: boolean;
  massiveFileName: string;

  constructor(
    private accessoryService: AccessoryService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public photoData: any
  ) {
    this.createForm();
  }

  ngOnInit() {
    console.log(this.photoData);
  }

  public onSubmit() {
    const formData: FormData = new FormData();
    formData.append("photos", this.uploadForm.get("photos").value);

    this.accessoryService
      .upload(this.photoData._id, formData)
      .subscribe((res) => {
        this.dialogRef.close();
      });
  }

  onFileSelected($event) {
    if ($event.target.files.length > 0) {
      this.massiveFileName = $event.target.files[0].name;
      this.massiveFileHasLoaded = true;

      const [file] = $event.target.files;
      this.uploadForm
        .get("photos")
        .setValue(file, { emitModelToViewChange: false });
    }
  }

  private createForm() {
    this.uploadForm = this.formBuilder.group({
      photos: [""],
    });
  }
}
