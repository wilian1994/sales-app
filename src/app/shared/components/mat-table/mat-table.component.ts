import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog
} from "@angular/material";
import { Product } from "../../models/Product";
import { SalesService } from "src/app/controllers/sales/sales.service";
import { tap, catchError } from "rxjs/operators";
import { AlertModalService } from "../../services/alert-modal.service";
import { EMPTY } from "rxjs";
import { STATUS } from "../../models/Status";
import { DialogModalComponent } from "../dialog-modal/dialog-modal.component";
import { DialogPendingComponent } from "../dialog-pending/dialog-pending.component";
import { SelectionModel } from "@angular/cdk/collections";
import { AuthenticationService } from "../../services/authentication.service";
import { Sale } from "../../models/Sale";
import { FirebaseService } from "src/app/core/services/firebase.service";

import { Order } from "../../models/Order";
import { element } from "protractor";

@Component({
  selector: "app-mat-table",
  templateUrl: "./mat-table.component.html",
  styleUrls: ["./mat-table.component.css"]
})
export class MatTableComponent implements OnInit {
  @Input() link: any;
  @Input() data: any;
  @Input() displayedColumns: string[];
  @Input() sortActive: string = "update";
  @Input() status: STATUS;
  @Input() actionsButton: any;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;

  totalSize = 0;
  pageIndex = 0;
  pageSize = 5;
  product: any;
  data$ = new MatTableDataSource<any>();
  selection = new SelectionModel<Product>(true, []);

  constructor(
    private router: Router,
    private saleService: SalesService,
    private alertService: AlertModalService,
    private alertModal: AlertModalService,
    public dialog: MatDialog,
    public authentication: AuthenticationService,
    private firebase: FirebaseService
  ) {}

  ngOnInit() {
    console.log("link", this.actionsButton);
    this.displayedColumns.unshift("select");
    this.listAll();
  }

  onSearch(value: string) {
    this.data$.filter = value.trim().toLocaleLowerCase();
  }

  onEdit(data) {
    console.log(data._id);
    this.router.navigateByUrl(`${this.link}/${data._id}`);
  }

  async onUpdate(product: any) {
    product.updateDate = new Date();
    console.log(product);
    try {
      await this.firebase.update(product.id, product);
      this.alertModal.showAlertSucess("Produto atualizado com sucesso");
    } catch (error) {
      this.alertService.showAlertDanger(
        "Erro ao carregar pedidos. Tente novamentes  mais tarde!"
      );
    }
  }

  openDialog(item): void {
    console.log("item", item);
    this.dialog.open(DialogModalComponent, {
      height: "600px",
      width: "600px",
      data: item
    });
  }

  onNewObject() {
    this.router.navigate(this.link);
  }

  ngAfterViewInit(): void {
    this.data$.sort = this.sort;
    this.data$.paginator = this.paginator;
  }

  finalizedOrder(data) {
    var record = {};
    record["id"] = data.id;
    this.firebase.create_order(record);
  }

  listAll() {
    this.data$.data = this.data.sort((a, b) => {
      if (a.days) {
        return Number(b.days) - Number(a.days);
      }
    });
    // this.service
    //   .listAll(this.authentication.currentUserValue.business, this.status)
    //   .pipe(
    //     tap(element => console.log("elemento", element)),
    //     catchError((error: any) => {
    //       this.handleError();
    //       // this.error$.next(true);
    //       return EMPTY;
    //     })
    //   )
    //   .subscribe(data => {
    //     this.data$.data = data;
    //   });
  }

  handleError() {
    this.alertService.showAlertDanger(
      "Erro ao carregar pedidos. Tente novamentes  mais tarde!"
    );
  }

  onDelete(data) {}

  onChangeStatus(product: any): void {
    console.log(product);
    const dialogRef = this.dialog.open(DialogPendingComponent, {
      height: "600px",
      width: "300px",
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        const totalPriceProduct = product.price * result.quantity;
        const freight = result.freight || 0;
        const data: any = {
          product: product._id,
          orderCode: result.orderCode,
          priceProduct: product.price,
          business: this.authentication.currentUserValue.business,
          totalPriceProduct,
          finalValue: product.finalValue,
          salesValue: result.totalSales / result.quantity,
          grossAmount: result.totalSales - totalPriceProduct - freight,
          days: product.days,
          status: STATUS.TORECEIVED,
          ...result
        };
        this.saleService.save(data).subscribe(
          // tslint:disable-next-line:no-console
          () => {
            this.alertModal.showAlertSucess(
              "Order alterada para Recebida com sucesso"
            );
            this.listAll();
          },
          err => console.error("Erro ao cadastrar loja ", err)
        );
      }
    });
  }

  onChangeStatusSale(sale: Sale): void {
    let data = sale || this.selection.selected;
    console.log(data);
    console.log("onChangeStatus", sale);
    // this.service.completedSale(data).subscribe(
    //   // tslint:disable-next-line:no-console
    //   () => {
    //     this.alertModal.showAlertSucess(
    //       "Order alterada para Recebida com sucesso"
    //     );
    //     this.listAll();
    //   },
    //   err => console.error("Erro ao cadastrar loja ", err)
    // );
  }

  onUpdateAll() {
    let teste = this.selection.selected.slice(0, this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data$.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.data$.data.forEach(row => this.selection.select(row));
  }

  onChangeStatusOrder(data: any): void {
    // this.service.orderConfirmed(data).subscribe(
    //   () => {
    //     this.alertModal.showAlertSucess(
    //       "Order alterada para Recebida com sucesso"
    //     );
    //     this.listAll();
    //   },
    //   err => console.error("Erro ao cadastrar loja ", err)
    // );
  }
}
