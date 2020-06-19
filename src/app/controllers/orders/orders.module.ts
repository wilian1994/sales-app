import { AppModule } from './../../app.module';
import { ListFinalizedComponent } from './list-finalized/list-finalized.component';
import { ListPendingComponent } from './list-pending/list-pending.component';
import { ListReceivedComponent } from 'src/app/controllers/orders/list-received/list-received.component';
import { AddOrdersComponent } from './add-orders/add-orders.component';
import { ListAwaitingComponent } from './list-awaiting/list-awaiting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrdersRoutingModule } from './orders.routing.module';
import { MaterialModule } from 'src/app/material.example.module';
import { CurrencyMaskModule, CURRENCY_MASK_CONFIG } from "ng2-currency-mask";
import {CustomCurrencyMaskConfig} from '../../shared/utils/CustomCurrencyMaskConfig'
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ListAwaitingComponent,
    ListReceivedComponent,
    ListPendingComponent,
    ListFinalizedComponent,
    AddOrdersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrdersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CurrencyMaskModule,
    TranslateModule,
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
],
})
export class OrdersModule { }
