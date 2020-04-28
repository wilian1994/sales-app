import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  service: any;

  constructor(
    private productsService: ProductsService,
  ) { }

  ngOnInit() {
    this.service = this.productsService;
    console.log('ListProductsComponent')

  }

}
