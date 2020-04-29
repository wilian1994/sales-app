import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddOrdersComponent } from './add-orders/add-orders.component';
import { ListAwaitingComponent } from './list-awaiting/list-awaiting.component';

const routes: Routes = [
  {
    path: 'orders',
    children: [
      {
        path: '',
        component: ListAwaitingComponent,
      },
      {
        path: 'register',
        component: AddOrdersComponent,
      },
      {
        path: 'edit/:id',
        component: AddOrdersComponent,
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
export class OrdersRoutingModule { }
