import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    path: 'stores',
    loadChildren: () => import('./controllers/stores/stores.module').then(m => m.StoresModule),
  },
  {
    path: 'categories',
    loadChildren: () => import('./controllers/categories/categories.module').then(m => m.CategoriesModule),
  },
  {
    path: 'marketplaces',
    loadChildren: () => import('./controllers/marketplaces/marketplaces.module').then(m => m.MarketplacesModule),
  },
  {
    path: 'paymentTypes',
    loadChildren: () => import('./controllers/paymentTypes/paymentTypes.module').then(m => m.PaymentTypesModule),
  },
  {
    path: 'products',
    loadChildren: () => import('./controllers/products/products.module').then(m => m.ProductsModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
