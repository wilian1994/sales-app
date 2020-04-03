import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/shared/models/Category';
import { Observable, Subject, EMPTY } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../add-categories/categories.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  categories$: Observable<Category[]>;
  error$ = new Subject<boolean>();
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal', null) deleteModal;
  selectedId: string;

  constructor(
    private categoriesService: CategoriesService,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.listCategories();
  }

  listCategories(){
    this.categories$ = this.categoriesService.listAll()
      .pipe(
        catchError((error: any) => {
          this.handleError()
          // this.error$.next(true);
          return EMPTY;
        })
      )
  }

  onEdit(id: string){
    this.router.navigate(['edit', id], {relativeTo: this.route});
  }

  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar categorias. Tente novamentes  mais tarde!');
  }

  onDelete(id: string){
    this.selectedId = id;
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja removar este registro', 'Não', 'Sim');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.categoriesService.delete(id) : EMPTY)
    )
    .subscribe(
      () => this.listCategories(),
      (err)  => alert('ERRO ao remover o produto')
    )
  }

}