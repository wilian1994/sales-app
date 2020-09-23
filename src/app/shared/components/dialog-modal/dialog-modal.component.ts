import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ListAwaitingComponent } from "src/app/controllers/orders/list-awaiting/list-awaiting.component";

@Component({
  selector: "app-dialog-modal",
  templateUrl: "./dialog-modal.component.html",
  styleUrls: ["./dialog-modal.component.css"]
})
export class DialogModalComponent {
  urlImg =
    "https://www1.djicdn.com/cms/uploads/c6af0531a05820867012a6b9535149e2.png";

  constructor(
    public dialogRef: MatDialogRef<ListAwaitingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log("data recebida", this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
