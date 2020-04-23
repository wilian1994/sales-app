import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCategoriesComponent } from './controllers/categories/list-categories/list-categories.component';
import { AddCategoriesComponent } from './controllers/categories/add-categories/add-categories.component';

const routes: Routes = [

  {
    path: 'stores',
    loadChildren: () => import('./controllers/stores/stores.module').then(m => m.StoresModule),
  },
  {
    path: 'categories',
    loadChildren: () => import('./controllers/categories/categories.module').then(m => m.CategoriesModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
