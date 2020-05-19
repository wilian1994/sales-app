import { Component, OnInit, Inject } from '@angular/core';
import { ListReceivedComponent } from 'src/app/controllers/orders/list-received/list-received.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-pending',
  templateUrl: './dialog-pending.component.html',
  styleUrls: ['./dialog-pending.component.css']
})
export class DialogPendingComponent  {

  constructor(
    public dialogRef: MatDialogRef<ListReceivedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
