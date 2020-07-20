import { Order } from "./../../../shared/models/Order";
import {
  FormBuilder,
  FormControl,
  FormControlName,
  NgControl
} from "@angular/forms";
import { DialogModalComponent } from "./../../../shared/components/dialog-modal/dialog-modal.component";
import { catchError, take, switchMap, debounceTime } from "rxjs/operators";
import { OrdersService } from "./../orders.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertModalService } from "src/app/shared/services/alert-modal.service";
import { EMPTY, Subject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from "@angular/material";
import { STATUS } from "src/app/shared/models/Status";

@Component({
  selector: "app-list-awaiting",
  templateUrl: "./list-awaiting.component.html",
  styleUrls: ["./list-awaiting.component.css"]
})
export class ListAwaitingComponent implements OnInit {
  displayedColumns = [
    "product",
    "store",
    "tracking",
    "purchaseValue",
    "quantity",
    "actions"
  ];
  link: string = "/orders/register";
  service: any;
  actions = { awaiting: true };
  status = STATUS.AWAITING;

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.service = this.ordersService;
  }
}
