import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, EMPTY, Subject } from 'rxjs';
import { AlertModalService } from '../../services/alert-modal.service';
import { take, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  service: any;

  @Input()
  link: string;

  @Input()
  columns: any [] = ["name"];

  data$: any;
  error$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private alertService: AlertModalService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.listAll();
    console.log('card component')
  }

  onNew() {
    this.router.navigate([this.link]);
  }

  onEdit(id: string){
    this.router.navigate(['edit', id], {relativeTo: this.route});
  }

  onDelete(id: string){
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja removar este registro', 'Não', 'Sim');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.service.delete(id) : EMPTY)
    )
    .subscribe(
      () => this.listAll(),
      (err)  => alert('ERRO ao remover o produto')
    )
  }

  listAll(){
    this.data$ = this.service.listAll()
      .pipe(
        catchError((error: any) => {
          this.handleError()
          // this.error$.next(true);
          return EMPTY;
        })
      )
  }

  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar categorias. Tente novamentes  mais tarde!');
  }

}
