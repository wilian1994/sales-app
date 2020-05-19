import { switchMap, take, catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { EMPTY, Subject } from 'rxjs';
import { DialogModalComponent } from 'src/app/shared/components/dialog-modal/dialog-modal.component';
import { OrdersService } from '../orders.service';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { STATUS } from 'src/app/shared/models/Status';
import { DialogPendingComponent } from 'src/app/shared/components/dialog-pending/dialog-pending.component';

@Component({
  selector: 'app-list-received',
  templateUrl: './list-received.component.html',
  styleUrls: ['./list-received.component.css']
})
export class ListReceivedComponent implements OnInit {
  data$: any;
  displayedColumns = ['name', 'store', 'tracking', 'purchaseValue', 'actions'];
  error$ = new Subject<boolean>();

  constructor(
    private ordersService: OrdersService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.listAll();
  }

  listAll(){
    this.data$ = this.ordersService.listAllByStatus(STATUS.RECEIVED)
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

  onChangeStatus(): void {
    const dialogRef = this.dialog.open(DialogPendingComponent, {
      height: '300px',
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }

}
