import { Component, OnInit, ViewChild } from '@angular/core';
import { StoresService } from '../stores.service';
import { Store } from 'src/app/shared/models/Store';
import { Observable, EMPTY, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';

@Component({
  selector: 'app-list-stores',
  templateUrl: './list-stores.component.html',
  styleUrls: ['./list-stores.component.css']
})
export class ListStoresComponent implements OnInit {

  stores$: Observable<Store[]>;
  error$ = new Subject<boolean>();
  @ViewChild('tableteste', {static: true}) tableteste;

  constructor(
    private storesService: StoresService,
    private alertService: AlertModalService
  ) { }

  ngOnInit() {
    console.log('entrou')
    this.listStore();
    console.log(this.tableteste)
  }

  listStore(){
    this.stores$ = this.storesService.listAll()
      .pipe(
        catchError((error: any) => {
          this.handleError()
          return EMPTY;
        })
      );
  }

  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar lojas. Tente novamentes  mais tarde!');
  }

  onEdit(){
    return null;
  }

  onDelete(){
    return null;
  }


}
