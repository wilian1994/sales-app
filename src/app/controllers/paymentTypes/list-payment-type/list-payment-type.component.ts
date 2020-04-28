import { Component, OnInit } from '@angular/core';
import { PaymentTypesService } from '../paymentTypes.service';

@Component({
  selector: 'app-list-payment-type',
  templateUrl: './list-payment-type.component.html',
  styleUrls: ['./list-payment-type.component.css']
})
export class ListPaymentTypeComponent implements OnInit {

  service: any;

  constructor(
    private paymentTypes: PaymentTypesService,
  ) { }

  ngOnInit() {
    this.service = this.paymentTypes;
    console.log('ListPaymentTypeComponent')
  }

}
