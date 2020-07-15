import { Component, OnInit, Inject } from "@angular/core";
import { ListReceivedComponent } from "src/app/controllers/orders/list-received/list-received.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MarketplaceService } from "src/app/controllers/marketplaces/marketplaces.service";
import { catchError } from "rxjs/operators";
import { EMPTY, Observable } from "rxjs";
import { Marketplace } from "../../models/Marketplace";

@Component({
  selector: "app-dialog-pending",
  templateUrl: "./dialog-pending.component.html",
  styleUrls: ["./dialog-pending.component.css"]
})
export class DialogPendingComponent implements OnInit {
  freight = false;
  marketplace$: Marketplace[] = [];
  investor$: any = [
    { name: "Wilian" },
    { name: "Will" },
    { name: "Daniel" },
    { name: "Daniel" },
    { name: "Lulinha" },
    { name: "André" }
  ];

  constructor(
    public dialogRef: MatDialogRef<ListReceivedComponent>,
    private marketService: MarketplaceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.marketService.listAll().subscribe((marketplaces: Marketplace[]) => {
      this.marketplace$ = marketplaces;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
