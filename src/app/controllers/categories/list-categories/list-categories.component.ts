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
  service: any;

  constructor(
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit() {
    this.service = this.categoriesService;

  }

  // handleError(){
  //   this.alertService.showAlertDanger('Erro ao carregar categorias. Tente novamentes  mais tarde!');
  // }

  // onEdit(id: string){
  //   this.router.navigate(['edit', id], {relativeTo: this.route});
  // }

  // onDelete(id: string){
  //   const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja removar este registro', 'Não', 'Sim');
  //   result$.asObservable()
  //   .pipe(
  //     take(1),
  //     switchMap(result => result ? this.categoriesService.delete(id) : EMPTY)
  //   )
  //   .subscribe(
  //     () => this.listCategories(),
  //     (err)  => alert('ERRO ao remover o produto')
  //   )
  // }

}
