import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListStoresComponent } from './list-stores/list-stores.component';

const routes: Routes = [
  {
    path: 'stores',
    children: [
      {
        path: '',
        component: ListStoresComponent,
      },
      // {
      //   path: 'edit/:id',
      //   component: AddCategoriesComponent,
      //   resolve: {
      //     category: CategoriesResolverGuard
      //   }
      // },
      // {
      //   path: 'register',
      //   component: AddCategoriesComponent,
      //   resolve: {
      //     category: CategoriesResolverGuard
      //   }
      // }

    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class StoresRoutingModule { }
