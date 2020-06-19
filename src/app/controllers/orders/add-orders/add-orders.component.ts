import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../orders.service';
import { Order } from 'src/app/shared/models/Order';
import { Location } from '@angular/common';
import { ProductsService } from '../../products/products.service';
import { StoresService } from '../../stores/stores.service';
import { Product } from 'src/app/shared/models/Product';
import { Store } from 'src/app/shared/models/Store';
import { PaymentTypesService } from '../../paymentTypes/paymentTypes.service';
import { PaymentType } from 'src/app/shared/models/PaymentType';
import { STATUS } from 'src/app/shared/models/Status';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrls: ['./add-orders.component.css']
})
export class AddOrdersComponent implements OnInit {

  register: FormGroup;
  submitted: boolean = false;
  id: string;
  quantity: number = 0;

  products$:  Product[] = [];
  filteredProducts$:   Observable<Product[]>;

  stores$:  Store[] = [];
  paymentTypes$: PaymentType[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private ordersService: OrdersService,
    private productsService : ProductsService,
    private storesService : StoresService,
    private paymentTypesService: PaymentTypesService,
    private alertModal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.loadProducts();
    this.loadStores();
    this.loadPaymentTypes();
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.ordersService.view(this.id).subscribe((order: Order) => this.createForm(order));
      return;
    }

    this.createForm();
  }



  private createForm(order?: Order){
    console.log('order', order)
    this.register = this.formBuilder.group({
      _id: [order ? order._id : null],
      product: [order ? order.product: '' , Validators.required],
      requestCode: [order ? order.requestCode : '' , Validators.required],
      store: [order ? order.store : '' , Validators.required],
      tracking: [order ? order.tracking : '' , Validators.required],
      purchaseValue: [order ? order.purchaseValue : '' , Validators.required],
      purchaseDate: [order ? order.purchaseDate : '' , Validators.required],
      investor: [order ? order.investor : '' , Validators.required],
      paymentType: [order ? order.paymentType : '' , Validators.required],
      quantity: [order ? order.quantity : '' , Validators.required],
      status: [STATUS.AWAITING],
    })
  }

  private loadProducts(){
    this.productsService
      .listAll()
      .subscribe(
        (products: Product[]) =>{
          this.products$ = products
         }
    )
  }

  private loadPaymentTypes(){
    this.paymentTypesService
      .listAll()
      .subscribe(
        (paymentTypes: PaymentType[]) =>{
          this.paymentTypes$ = paymentTypes
         }
    )
  }

  private loadStores(){
    this.storesService
      .listAll()
      .subscribe(
        (stores: Store[]) =>{
          this.stores$ = stores
         }
    )
  }

  onSave(){
    console.log('call save')
    this.submitted = true;
    console.log(this.register.value)
    if(this.register.valid){
      let data:any  = this.register.value;
      for (let index = 0; index < this.quantity; index++) {
        data.quantity = 1;
        this.ordersService.save(data)
        .subscribe(
          // tslint:disable-next-line:no-console
          ()  => {
            this.alertModal.showAlertSucess('Loja salvo/editado com sucesso');
          },
          err => console.error('Erro ao cadastrar loja ', err)
        )
      }
      this.location.back();
    }
  }

  hasError(field: string) {
    return this.register.get(field).errors;
  }

  verifyValidTouched(field){
    return !this.register.get(field).valid && this.register.get(field).touched;
  }

  onCancel(){
    this.submitted = false;
    this.register.reset();
    this.router.navigateByUrl("/orders");
  }

}
