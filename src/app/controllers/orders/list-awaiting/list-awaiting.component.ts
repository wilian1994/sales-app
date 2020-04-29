import { catchError, take, switchMap } from 'rxjs/operators';
import { OrdersService } from './../orders.service';
import { Component, OnInit } from '@angular/core';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { EMPTY, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-awaiting',
  templateUrl: './list-awaiting.component.html',
  styleUrls: ['./list-awaiting.component.css']
})
export class ListAwaitingComponent implements OnInit {

  data$: any;
  error$ = new Subject<boolean>();

  constructor(
    private ordersService: OrdersService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.listAll();
  }

  listAll(){
    this.data$ = this.ordersService.listAll()
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

}
