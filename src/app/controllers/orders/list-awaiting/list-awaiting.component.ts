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
import { FirebaseService } from "src/app/core/services/firebase.service";

@Component({
  selector: "app-list-awaiting",
  templateUrl: "./list-awaiting.component.html",
  styleUrls: ["./list-awaiting.component.css"]
})
export class ListAwaitingComponent implements OnInit {
  displayedColumns = ["observation", "actions"];
  link: string = "/orders/register";
  service: any;
  actions = { awaiting: true };
  status = STATUS.AWAITING;
  orders: any[] = [];

  constructor(
    private ordersService: OrdersService,
    private firebase: FirebaseService
  ) {}

  ngOnInit() {
    this.firebase.reads_orders().subscribe(data => {
      data.forEach(e => {
        const data: any = e.payload.doc.data();
        let orders: any = {
          itens:
            data.itens.length > 0
              ? data.itens.map(element => element.item.descricao).join(",")
              : "Não há itens",
          id: e.payload.doc.id,
          saleDate: data.data,
          saleValue: data.total,
          productCost:
            data.itens.length > 0
              ? data.itens.reduce(
                  (total, element) =>
                    (total += Number(element.item.productCost)),
                  0
                )
              : 0,
          observation: data.observation
        };

        this.orders.push(orders);
      });
    });
  }
}
