import { AddOrdersComponent } from './add-orders/add-orders.component';
import { ListAwaitingComponent } from './list-awaiting/list-awaiting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrdersRoutingModule } from './orders.routing.module';

@NgModule({
  declarations: [
    ListAwaitingComponent,
    AddOrdersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrdersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class OrdersModule { }
