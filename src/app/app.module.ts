import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import localePt from "@angular/common/locales/pt";

import { AppComponent } from "./app.component";

import { ModalModule } from "ngx-bootstrap/modal";

import { CategoriesModule } from "./controllers/categories/categories.module";

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AppRoutingModule } from "./app.routing.module";
import { StoresModule } from "./controllers/stores/stores.module";
import { MarketplacesModule } from "./controllers/marketplaces/marketplaces.module";
import { PaymentTypesModule } from "./controllers/paymentTypes/paymentTypes.module";
import { ProductsModule } from "./controllers/products/products.module";
import { OrdersModule } from "./controllers/orders/orders.module";

import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";

import { MaterialModule } from "./material.example.module";
import { CurrencyMaskModule, CURRENCY_MASK_CONFIG } from "ng2-currency-mask";
import { CustomCurrencyMaskConfig } from "./shared/utils/CustomCurrencyMaskConfig";
import { SalesComponent } from "./controllers/sales/sales.component";
import { GraphsComponent } from "./shared/components/graphs/graphs.component";
import { LoginComponent } from "./controllers/login/login.component";
import { LoginModule } from "./controllers/login/login.module";
import { AddMarketplacesComponent } from "./controllers/marketplaces/add-marketplaces/add-marketplaces.component";
import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";

registerLocaleData(localePt, "pt");

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GraphsComponent,
    FooterComponent,
    SalesComponent,
    AddMarketplacesComponent
  ],
  imports: [
    CategoriesModule,
    StoresModule,
    MarketplacesModule,
    PaymentTypesModule,
    ProductsModule,
    LoginModule,
    OrdersModule,
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MaterialModule,
    CurrencyMaskModule
  ],
  exports: [TranslateModule],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "pt"
    },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
