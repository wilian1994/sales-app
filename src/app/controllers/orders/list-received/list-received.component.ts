import { switchMap, take, catchError, map, tap } from "rxjs/operators";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { EMPTY, Subject } from "rxjs";
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
import { Product } from "src/app/shared/models/Product";
import { ProductsService } from "../../products/products.service";
import { SalesService } from "../../sales/sales.service";
import * as moment from "moment";
import { element } from "protractor";

@Component({
  selector: "app-list-received",
  templateUrl: "./list-received.component.html",
  styleUrls: ["./list-received.component.css"]
})
export class ListReceivedComponent implements OnInit {
  public data$ = new MatTableDataSource<any>();
  displayedColumns = [
    "name",
    "price",
    "quantity",
    "days",
    "suggestedValue",
    "actions"
  ];
  error$ = new Subject<boolean>();
  totalSize = 0;
  pageIndex = 0;
  pageSize = 5;
  product: any;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;

  constructor(
    private productService: ProductsService,
    private saleService: SalesService,
    private alertService: AlertModalService,
    private alertModal: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.listAll();
    console.log(this.data$);
  }

  ngAfterViewInit(): void {
    console.log("this sort", this.sort);
    this.data$.sort = this.sort;
    this.data$.paginator = this.paginator;
  }

  listAll() {
    console.log("init listall");
    this.productService
      .listAll()
      .pipe(
        tap(element => console.log("elemento", element)),
        catchError((error: any) => {
          this.handleError();
          // this.error$.next(true);
          return EMPTY;
        })
      )
      .subscribe(data => {
        this.data$.data = data;
      });
  }

  handleError() {
    this.alertService.showAlertDanger(
      "Erro ao carregar pedidos. Tente novamentes  mais tarde!"
    );
  }

  onEdit(id: string) {
    this.router.navigate(["edit", id], { relativeTo: this.route });
  }

  onSearch(value: string) {
    this.data$.filter = value.trim().toLocaleLowerCase();
  }

  onUpdate(product: any) {
    console.log(product);
    product.lastValue = product.finalValue;
    this.productService.save(product).subscribe(
      // tslint:disable-next-line:no-console
      () => {
        this.alertModal.showAlertSucess("Produto alterado com sucesso");
        this.listAll();
      },
      err => console.error("Erro ao cadastrar loja ", err)
    );
  }

  onChangeProduct(product) {
    console.log(product);
    this.product = product;
  }

  // onDelete(id: string) {
  //   const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja removar este registro', 'Não', 'Sim');
  //   result$.asObservable()
  //     .pipe(
  //       take(1),
  //       switchMap(result => result ? this.ordersService.delete(id) : EMPTY)
  //     )
  //     .subscribe(
  //       () => this.listAll(),
  //       (err) => alert('ERRO ao remover o pedido')
  //     )
  // }

  openDialog(): void {
    this.dialog.open(DialogModalComponent, {
      height: "600px",
      width: "600px",
      data: {}
    });
  }

  onChangeStatus(product: any): void {
    console.log(product);
    const dialogRef = this.dialog.open(DialogPendingComponent, {
      height: "500px",
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
          salesMan: "Wilian",
          orderCode: "44444",
          priceProduct: product.price,
          totalPriceProduct,
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
}
