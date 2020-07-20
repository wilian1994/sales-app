import { AddProductsComponent } from "./add-products/add-products.component";
import { ListProductsComponent } from "./list-products/list-products.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { ProductsRoutingModule } from "./products.routing.module";
import { MaterialModule } from "src/app/material.example.module";
import { CurrencyMaskModule, CURRENCY_MASK_CONFIG } from "ng2-currency-mask";
import { CustomCurrencyMaskConfig } from "src/app/shared/utils/CustomCurrencyMaskConfig";

@NgModule({
  declarations: [ListProductsComponent, AddProductsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CurrencyMaskModule
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ]
})
export class ProductsModule {}
