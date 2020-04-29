import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CategoriesModule } from './controllers/categories/categories.module';
import { AppRoutingModule } from './app.routing.module';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { StoresModule } from './controllers/stores/stores.module';
import { MarketplacesModule } from './controllers/marketplaces/marketplaces.module';
import { PaymentTypesModule } from './controllers/paymentTypes/paymentTypes.module';
import { ListProductsComponent } from './controllers/products/list-products/list-products.component';
import { AddProductsComponent } from './controllers/products/add-products/add-products.component';
import { ProductsModule } from './controllers/products/products.module';
import { AddOrdersComponent } from './controllers/orders/add-orders/add-orders.component';
import { ListAwaitingComponent } from './controllers/orders/list-awaiting/list-awaiting.component';
import { OrdersModule } from './controllers/orders/orders.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    CategoriesModule,
    StoresModule,
    MarketplacesModule,
    PaymentTypesModule,
    ProductsModule,
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
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
