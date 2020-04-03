import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { CategoriesResolverGuard } from './guards/categories-resolver.guard';
import { CategoriesMaterialComponent } from '../categories-material/categories-material.component';

const routes: Routes = [
  {
    path: 'categories',
    // component: ListCategoriesComponent,
    component: CategoriesMaterialComponent
  },
  {
    path: 'categories',
    children: [
      {
        path: '',
        component: ListCategoriesComponent,
      },
      {
        path: 'edit/:id',
        component: AddCategoriesComponent,
        resolve: {
          category: CategoriesResolverGuard
        }
      },
      {
        path: 'register',
        component: AddCategoriesComponent,
        resolve: {
          category: CategoriesResolverGuard
        }
      }

    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
