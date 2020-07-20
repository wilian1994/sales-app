import { Order } from "src/app/shared/models/Order";
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
import { Sale } from "src/app/shared/models/Sale";
import { AuthenticationService } from "src/app/shared/services/authentication.service";

@Component({
  selector: "app-list-pending",
  templateUrl: "./list-pending.component.html",
  styleUrls: ["./list-pending.component.css"]
})
export class ListPendingComponent implements OnInit {
  displayedColumns = ["product", "salesValue", "lucro", "orderCode", "actions"];
  service: any;
  error$ = new Subject<boolean>();
  status = STATUS.TORECEIVED;
  actions = { toreceived: true };
  link = null;

  constructor(private salesService: SalesService) {}

  ngOnInit() {
    this.service = this.salesService;
  }

  // listAll() {
  //   this.data$ = this.salesService
  //     .listAllByStatus(STATUS.TORECEIVED, this.authentication.business)
  //     .pipe(
  //       catchError((error: any) => {
  //         this.handleError();
  //         // this.error$.next(true);
  //         return EMPTY;
  //       })
  //     );
  // }
  // handleError() {
  //   this.alertService.showAlertDanger(
  //     "Erro ao carregar pedidos. Tente novamentes  mais tarde!"
  //   );
  // }

  // onEdit(id: string) {
  //   this.router.navigate(["edit", id], { relativeTo: this.route });
  // }

  // onDelete(id: string) {
  //   const result$ = this.alertService.showConfirm(
  //     "Confirmação",
  //     "Tem certeza que deseja removar este registro",
  //     "Não",
  //     "Sim"
  //   );
  //   result$
  //     .asObservable()
  //     .pipe(
  //       take(1),
  //       switchMap(result => (result ? this.ordersService.delete(id) : EMPTY))
  //     )
  //     .subscribe(
  //       () => this.listAll(),
  //       err => alert("ERRO ao remover o pedido")
  //     );
  // }

  // openDialog(): void {
  //   this.dialog.open(DialogModalComponent, {
  //     height: "600px",
  //     width: "600px",
  //     data: {}
  //   });
  // }

  // onChangeStatus(sale: Sale): void {
  //   sale.status = STATUS.FINALIZED;
  //   console.log("onChangeStatus", sale);
  //   this.salesService.completedSale(sale).subscribe(
  //     // tslint:disable-next-line:no-console
  //     () => {
  //       this.alertModal.showAlertSucess(
  //         "Order alterada para Recebida com sucesso"
  //       );
  //       this.listAll();
  //     },
  //     err => console.error("Erro ao cadastrar loja ", err)
  //   );
  // }
}
