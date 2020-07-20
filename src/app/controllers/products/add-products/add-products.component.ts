import { CategoriesService } from "src/app/controllers/categories/add-categories/categories.service";
import { Category } from "src/app/shared/models/Category";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

import { ProductsService } from "../products.service";
import { Product } from "src/app/shared/models/Product";
import { AlertModalService } from "src/app/shared/services/alert-modal.service";
import { AuthenticationService } from "src/app/shared/services/authentication.service";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { element } from "protractor";

@Component({
  selector: "app-add-products",
  templateUrl: "./add-products.component.html",
  styleUrls: ["./add-products.component.css"]
})
export class AddProductsComponent implements OnInit {
  register: FormGroup;
  submitted: boolean = false;
  id: string;
  categories$: Category[] = [];
  filteredOptions: Observable<Category[]>;
  myControl = new FormControl();

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriessService: CategoriesService,
    private alertModal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private authentication: AuthenticationService
  ) {}

  ngOnInit() {
    console.log("data", this.route.data);
    this.categoriessService
      .listByBusiness(this.authentication.currentUserValue.business)
      .subscribe((categories: any) => (this.categories$ = categories));
    console.log(this.route.snapshot.params);
    this.id = this.route.snapshot.params["id"];
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
    if (this.id) {
      this.productsService
        .view(this.id)
        .subscribe((product: Product) => this.createForm(product));
      return;
    }

    this.createForm();
  }

  private _filter(obj: Category): Category[] {
    const filterValue: any = obj.name || obj;
    return this.categories$.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayCategory(category: Category) {
    console.log("display", category);
    return category ? category.name : "";
  }

  private createForm(product?: Product) {
    if (product) this.myControl.setValue(product.category);

    this.register = this.formBuilder.group({
      _id: [product ? product._id : null],
      name: [product ? product.name : "", Validators.required],
      category: [product ? product.category._id : "", Validators.required],
      quantity: [product ? product.quantity : "", Validators.required],
      price: [product ? product.price : "", Validators.required],
      lastedSale: [
        product ? product.lastedSale : new Date(),
        Validators.required
      ],
      business: [this.authentication.currentUserValue.business]
    });
  }

  onSave() {
    console.log("call save");
    this.submitted = true;
    if (this.register.valid) {
      let data = this.register.value;
      data.category = this.myControl.value._id;
      console.log("call valid");
      this.productsService.save(data).subscribe(
        // tslint:disable-next-line:no-console
        () => {
          this.alertModal.showAlertSucess("Loja salvo/editado com sucesso");
          this.location.back();
        },
        err => console.error("Erro ao cadastrar loja ", err)
      );
    }
  }

  hasError(field: string) {
    return this.register.get(field).errors;
  }

  verifyValidTouched(field) {
    return !this.register.get(field).valid && this.register.get(field).touched;
  }

  onCancel() {
    this.register.reset();
    this.location.back();
  }
}
