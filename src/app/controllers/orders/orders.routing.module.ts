import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddOrdersComponent } from './add-orders/add-orders.component';
import { ListAwaitingComponent } from './list-awaiting/list-awaiting.component';
import { ListReceivedComponent } from './list-received/list-received.component';
import { ListPendingComponent } from './list-pending/list-pending.component';
import { ListFinalizedComponent } from './list-finalized/list-finalized.component';

const routes: Routes = [
  {
    path: 'orders',
    children: [
      {
        path: 'awaiting',
        component: ListAwaitingComponent,
      },
      {
        path: 'received',
        component: ListReceivedComponent,
      },

      {
        path: 'pending',
        component: ListPendingComponent,
      },
      {
        path: 'finalized',
        component: ListFinalizedComponent,
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
