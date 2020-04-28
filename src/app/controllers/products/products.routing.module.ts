import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductsComponent } from './add-products/add-products.component';

const routes: Routes = [
  {
    path: 'products',
    children: [
      {
        path: '',
        component: ListProductsComponent,
      },
      {
        path: 'register',
        component: AddProductsComponent,
      },
      {
        path: 'edit/:id',
        component: AddProductsComponent,
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }