import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListPaymentTypeComponent } from './list-payment-type/list-payment-type.component';
import { AddPaymentTypeComponent } from './add-payment-type/add-payment-type.component';
import { PaymentTypesRoutingModule } from './paymentTypes.routing.module';

@NgModule({
  declarations: [
    ListPaymentTypeComponent,
    AddPaymentTypeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PaymentTypesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PaymentTypesModule { }
