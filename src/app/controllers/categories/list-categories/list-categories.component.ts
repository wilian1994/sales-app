import { Component, OnInit, ViewChild } from "@angular/core";
import { Category } from "src/app/shared/models/Category";
import { Observable, Subject, EMPTY } from "rxjs";
import { catchError, take, switchMap } from "rxjs/operators";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AlertModalService } from "src/app/shared/services/alert-modal.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CategoriesService } from "../add-categories/categories.service";
import { AuthenticationService } from "src/app/shared/services/authentication.service";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import { FirebaseService } from "src/app/core/services/firebase.service";

var firebaseConfig = {
  apiKey: "AIzaSyB4C367ZGu_qY6G7jy6j8NW2P7D-HO6CUY",
  authDomain: "sales-app-7c925.firebaseapp.com",
  databaseURL: "https://sales-app-7c925.firebaseio.com",
  projectId: "sales-app-7c925",
  storageBucket: "sales-app-7c925.appspot.com",
  messagingSenderId: "321061615688",
  appId: "1:321061615688:web:5d91eaa2055c752f18007d"
};

// Initialize Firebase

@Component({
  selector: "app-list-categories",
  templateUrl: "./list-categories.component.html",
  styleUrls: ["./list-categories.component.css"]
})
export class ListCategoriesComponent implements OnInit {
  service: any;

  displayedColumns = ["name", "actions"];
  categories$: Observable<Category[]>;

  constructor(
    private categoriesService: CategoriesService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private authentication: AuthenticationService,
    private firebase: FirebaseService
  ) {}

  ngOnInit() {
    this.listAll();
  }

  listAll() {
    this.categories$ = this.categoriesService
      .listByBusiness(this.authentication.business)
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

  // handleError(){
  //   this.alertService.showAlertDanger('Erro ao carregar categorias. Tente novamentes  mais tarde!');
  // }

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
        switchMap(result =>
          result ? this.categoriesService.delete(id) : EMPTY
        )
      )
      .subscribe(
        () => this.listAll(),
        err => alert("ERRO ao remover o produto")
      );
  }
}
