import { AddProductsComponent } from "./add-products/add-products.component";
import { ListProductsComponent } from "./list-products/list-products.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { ProductsRoutingModule } from "./products.routing.module";
import { MaterialModule } from "src/app/material.example.module";

@NgModule({
  declarations: [ListProductsComponent, AddProductsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class ProductsModule {}
