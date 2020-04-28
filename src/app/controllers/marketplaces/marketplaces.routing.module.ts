import { ListMarketplacesComponent } from './list-marketplaces/list-marketplaces.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'marketplaces',
    children: [
      {
        path: '',
        component: ListMarketplacesComponent,
      },
      // {
      //   path: 'register',
      //   component: AddStoresComponent,
      // },
      // {
      //   path: 'edit/:id',
      //   component: AddStoresComponent,
      // },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class MarketplacesRoutingModule { }
