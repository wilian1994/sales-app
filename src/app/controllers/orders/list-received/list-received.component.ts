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
import { ProductsService } from "../../products/products.service";
import { FirebaseService } from "src/app/core/services/firebase.service";

@Component({
  selector: "app-list-received",
  templateUrl: "./list-received.component.html",
  styleUrls: ["./list-received.component.css"]
})
export class ListReceivedComponent implements OnInit {
  displayedColumns = ["name", "days", "actions"];
  link: string = "/products/register";
  service: any;
  actions = { received: true };
  products: any[] = [];

  constructor(
    private productService: ProductsService,
    private firebase: FirebaseService
  ) {}

  ngOnInit() {
    this.service = this.productService;

    this.firebase.reads().subscribe(data => {
      data.forEach(e => {
        const data: any = e.payload.doc.data();
        let product: any = {
          name: data.descricao,
          days: this.calculateDate(data),
          id: e.payload.doc.id
        };
        if (data.saleDate) product.saleDate = data.saleDate;

        this.products.push(product);
      });
    });
  }

  calculateDate(data) {
    const document = data.updateDate;
    const saleDate = this.subDate(data.saleDate);
    var result = 100;

    if (document != null)
      result = new Date().getDate() - new Date(document * 1000).getDate();

    if (data.saleDate != null && saleDate > 10 && result < 7) {
      result = saleDate;
    }

    return result;
  }

  subDate(document) {
    return new Date().getDate() - new Date(document).getDate();
  }
}
