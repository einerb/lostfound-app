import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-modal-donate",
  templateUrl: "./modal-donate.component.html",
  styleUrls: ["./modal-donate.component.scss"],
})
export class ModalDonateComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ModalDonateComponent>) {}

  ngOnInit() {}

  public onClose(): void {
    this.dialogRef.close();
  }
}
