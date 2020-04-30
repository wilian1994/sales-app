import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { ModalModule } from 'ngx-bootstrap/modal';

import { CategoriesModule } from './controllers/categories/categories.module';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app.routing.module';
import { StoresModule } from './controllers/stores/stores.module';
import { MarketplacesModule } from './controllers/marketplaces/marketplaces.module';
import { PaymentTypesModule } from './controllers/paymentTypes/paymentTypes.module';
import { ProductsModule } from './controllers/products/products.module';
import { OrdersModule } from './controllers/orders/orders.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { MatToolbarModule, MatSidenavModule, MatDividerModule, MatIconModule, MatMenuModule, MatButtonModule, MatListModule } from '@angular/material';
import { AddCategoriesNewComponent } from './controllers/categories/add-categories-new/add-categories-new.component';



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
    MatButtonModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
