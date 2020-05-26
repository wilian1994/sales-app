import { Order } from 'src/app/shared/models/Order';
import { DialogModalComponent } from './../../../shared/components/dialog-modal/dialog-modal.component';
import { catchError, take, switchMap } from 'rxjs/operators';
import { OrdersService } from './../orders.service';
import { Component, OnInit } from '@angular/core';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { EMPTY, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { STATUS } from 'src/app/shared/models/Status';

@Component({
  selector: 'app-list-pending',
  templateUrl: './list-pending.component.html',
  styleUrls: ['./list-pending.component.css']
})
export class ListPendingComponent implements OnInit {

  data$: any;
  displayedColumns = ['name', 'store', 'salesValue', 'lucro', 'actions'];
  error$ = new Subject<boolean>();

  constructor(
    private ordersService: OrdersService,
    private alertService: AlertModalService,
    private alertModal: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.listAll();
  }

  listAll(){
    this.data$ = this.ordersService.listAllByStatus(STATUS.TORECEIVED)
      .pipe(
        catchError((error: any) => {
          this.handleError()
          // this.error$.next(true);
          return EMPTY;
        })
    )
  }

  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar pedidos. Tente novamentes  mais tarde!');
  }

  onEdit(id: string){
    this.router.navigate(['edit', id], {relativeTo: this.route});
  }

  onDelete(id: string){
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja removar este registro', 'Não', 'Sim');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.ordersService.delete(id) : EMPTY)
    )
    .subscribe(
      () => this.listAll(),
      (err)  => alert('ERRO ao remover o pedido')
    )
  }

  openDialog(): void {
    this.dialog.open(DialogModalComponent, {
      height: '600px',
      width: '600px',
      data: {}
    });

  }

  onChangeStatus(order: Order): void {
    const data: any  = {_id: order._id , status: STATUS.FINALIZED}
    this.ordersService.save(data)
      .subscribe(
        // tslint:disable-next-line:no-console
        ()  => {
          this.alertModal.showAlertSucess('Order alterada para Recebida com sucesso');
          this.listAll();
        },
        err => console.error('Erro ao cadastrar loja ', err)
      )
  }

}
