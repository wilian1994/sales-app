import { CategoriesService } from "src/app/controllers/categories/add-categories/categories.service";
import { Category } from "src/app/shared/models/Category";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

import { ProductsService } from "../products.service";
import { Product } from "src/app/shared/models/Product";
import { AlertModalService } from "src/app/shared/services/alert-modal.service";

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

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriessService: CategoriesService,
    private alertModal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoriessService
      .listAll()
      .subscribe((categories: any) => (this.categories$ = categories));
    this.id = this.route.snapshot.params["id"];
    if (this.id) {
      this.productsService
        .view(this.id)
        .subscribe((product: Product) => this.createForm(product));
      return;
    }

    this.createForm();
  }

  private createForm(product?: Product) {
    console.log("product", product);
    this.register = this.formBuilder.group({
      _id: [product ? product._id : null],
      name: [product ? product.name : "", Validators.required],
      category: [product ? product.category._id : "", Validators.required],
      quantity: [product ? product.quantity : "", Validators.required],
      price: [product ? product.price : "", Validators.required],
      lastedSale: [product ? product.lastedSale : "", Validators.required]
    });
  }

  private save() {
    console.log("call save");
    this.submitted = true;
    console.log(this.register.value);
    if (this.register.valid) {
      const data = this.register.value;
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
    this.submitted = false;
    this.register.reset();
    this.router.navigateByUrl("/products");
  }
}
