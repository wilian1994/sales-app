import { Order } from './../../../shared/models/Order';
import { FormBuilder, FormControl, FormControlName, NgControl } from '@angular/forms';
import { DialogModalComponent } from './../../../shared/components/dialog-modal/dialog-modal.component';
import { catchError, take, switchMap, debounceTime } from 'rxjs/operators';
import { OrdersService } from './../orders.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { EMPTY, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { STATUS } from 'src/app/shared/models/Status';


@Component({
  selector: 'app-list-awaiting',
  templateUrl: './list-awaiting.component.html',
  styleUrls: ['./list-awaiting.component.css']
})
export class ListAwaitingComponent implements OnInit {

  public data$ = new MatTableDataSource<Order>();
  displayedColumns = ['name', 'store', 'tracking', 'purchaseValue', 'quantity', 'actions'];
  error$ = new Subject<boolean>();
  search: Subject<string> = new Subject<string>();
  searching: string = "";
  totalSize = 0;
  pageIndex = 0;
  pageSize = 5;
  mobile: boolean = false
  skip = 0;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;

  constructor(
    private ordersService: OrdersService,
    private alertService: AlertModalService,
    private router: Router,
    private alertModal: AlertModalService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    // if (window.screen.width <= 768) { // 768px portrait
    //   this.displayedColumns = ['name', 'actions-mobile'];
    // }
    this.search
      .pipe(debounceTime(400))
      .subscribe(() => {
        this.listAll();
      })
    this.listAll();
  }

  ngAfterViewInit(): void {
    this.data$.sort = this.sort;
    this.data$.paginator = this.paginator;
  }

  listAll() {
    const data: any = { search: this.searching, status: STATUS.AWAITING, skip: this.skip }
    this.pageIndex = 0;
    this.totalSize = 0;
    this.ordersService.listBySearch(data)
      .pipe(
        catchError((error: any) => {
          this.handleError()
          // this.error$.next(true);
          return EMPTY;
        })
      )
      .subscribe((data: any) => {
        this.data$.data = data.filterOrdes;
        this.data$.paginator = this.paginator;
        this.totalSize = data.count;
      });
  }

  getPaginatorData(event: any) {
    this.skip = event.pageSize * event.pageIndex;
    this.listAll();
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar pedidos. Tente novamentes  mais tarde!');
  }

  onEdit(id: string) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  onDelete(id: string) {
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja removar este registro', 'Não', 'Sim');
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.ordersService.delete(id) : EMPTY)
      )
      .subscribe(
        () => this.listAll(),
        (err) => alert('ERRO ao remover o pedido')
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

    this.ordersService.orderConfirmed(order)
      .subscribe(() => {
        this.listAll();
      })
  }

  onSearch(event) {
    this.search.next();
  }
}
