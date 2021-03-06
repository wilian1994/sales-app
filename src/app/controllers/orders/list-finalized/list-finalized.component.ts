import { DialogModalComponent } from "./../../../shared/components/dialog-modal/dialog-modal.component";
import { catchError, take, switchMap } from "rxjs/operators";
import { OrdersService } from "./../orders.service";
import { Component, OnInit } from "@angular/core";
import { AlertModalService } from "src/app/shared/services/alert-modal.service";
import { EMPTY, Subject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { STATUS } from "src/app/shared/models/Status";
import { SalesService } from "../../sales/sales.service";
import { AuthenticationService } from "src/app/shared/services/authentication.service";

@Component({
  selector: "app-list-finalized",
  templateUrl: "./list-finalized.component.html",
  styleUrls: ["./list-finalized.component.css"]
})
export class ListFinalizedComponent implements OnInit {
  data$: any;
  displayedColumns = ["name", "salesValue", "lucro", "actions"];
  error$ = new Subject<boolean>();

  constructor(
    private ordersService: OrdersService,
    private salesService: SalesService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private authentication: AuthenticationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.listAll();
  }

  listAll() {
    this.data$ = this.salesService
      .listAllByStatus(STATUS.FINALIZED, this.authentication.business)
      .pipe(
        catchError((error: any) => {
          this.handleError();
          // this.error$.next(true);
          return EMPTY;
        })
      );
  }

  handleError() {
    this.alertService.showAlertDanger(
      "Erro ao carregar pedidos. Tente novamentes  mais tarde!"
    );
  }

  onEdit(id: string) {
    this.router.navigate(["edit", id], { relativeTo: this.route });
  }

  onDelete(id: string) {
    const result$ = this.alertService.showConfirm(
      "Confirmação",
      "Tem certeza que deseja removar este registro",
      "Não",
      "Sim"
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap(result => (result ? this.ordersService.delete(id) : EMPTY))
      )
      .subscribe(
        () => this.listAll(),
        err => alert("ERRO ao remover o pedido")
      );
  }

  openDialog(): void {
    this.dialog.open(DialogModalComponent, {
      height: "600px",
      width: "600px",
      data: {}
    });
  }
}
