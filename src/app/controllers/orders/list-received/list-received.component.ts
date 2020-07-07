import { switchMap, take, catchError, map, tap } from "rxjs/operators";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { EMPTY, Subject, Observable } from "rxjs";
import { DialogModalComponent } from "src/app/shared/components/dialog-modal/dialog-modal.component";
import { OrdersService } from "../orders.service";
import { AlertModalService } from "src/app/shared/services/alert-modal.service";
import { Router, ActivatedRoute } from "@angular/router";
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from "@angular/material";
import { STATUS } from "src/app/shared/models/Status";
import { DialogPendingComponent } from "src/app/shared/components/dialog-pending/dialog-pending.component";
import { ProductsService } from "../../products/products.service";
import { SalesService } from "../../sales/sales.service";
import { Product } from "src/app/shared/models/Product";

@Component({
  selector: "app-list-received",
  templateUrl: "./list-received.component.html",
  styleUrls: ["./list-received.component.css"]
})
export class ListReceivedComponent implements OnInit {
  displayedColumns = [
    "name",
    "price",
    "quantity",
    "days",
    "suggestedValue",
    "actions"
  ];
  link: string = "/products/register";
  service: any;

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.service = this.productService;
  }
}
