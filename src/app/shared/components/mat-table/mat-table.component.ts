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

@Component({
  selector: "app-mat-table",
  templateUrl: "./mat-table.component.html",
  styleUrls: ["./mat-table.component.css"]
})
export class MatTableComponent implements OnInit {
  @Input() link: any;
  @Input() service: any;
  @Input() displayedColumns: string[];
  @Input() receipt: boolean = false;
  @Input() sale: boolean = false;
  @Input() sortActive: string = "update";

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
    public authentication: AuthenticationService
  ) {}

  ngOnInit() {
    console.log("link", this.link);
    this.displayedColumns.unshift("select");
    this.listAll();
  }

  onSearch(value: string) {
    this.data$.filter = value.trim().toLocaleLowerCase();
  }

  onEdit(id: string) {
    // this.router.navigate(["edit", id], { relativeTo: this.route });
  }

  onUpdate(product: any) {
    console.log(product);
    product.lastValue = product.finalValue;
    this.service.save(product).subscribe(
      // tslint:disable-next-line:no-console
      () => {
        this.alertModal.showAlertSucess("Produto alterado com sucesso");
        this.listAll();
      },
      err => console.error("Erro ao cadastrar loja ", err)
    );
  }

  openDialog(): void {
    this.dialog.open(DialogModalComponent, {
      height: "600px",
      width: "600px",
      data: {}
    });
  }

  onNewObject() {
    this.router.navigate(this.link);
  }

  ngAfterViewInit(): void {
    this.data$.sort = this.sort;
    this.data$.paginator = this.paginator;
  }

  listAll() {
    this.service
      .listByBusiness(this.authentication.currentUserValue.business)
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
          business: this.authentication.currentUserValue.business,
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
}
