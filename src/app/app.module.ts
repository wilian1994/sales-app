import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { ModalModule } from 'ngx-bootstrap/modal';

import { CategoriesModule } from './controllers/categories/categories.module';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app.routing.module';
import { MaterialModule } from './material.example.module';
import { StoresModule } from './controllers/stores/stores.module';
import { MarketplacesModule } from './controllers/marketplaces/marketplaces.module';
import { PaymentTypesModule } from './controllers/paymentTypes/paymentTypes.module';
import { ProductsModule } from './controllers/products/products.module';
import { OrdersModule } from './controllers/orders/orders.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { MatToolbarModule, MatSidenavModule, MatDividerModule, MatIconModule, MatMenuModule } from '@angular/material';



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
  }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
