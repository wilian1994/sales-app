import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriesRoutingModule } from './categories.routing.module';



@NgModule({
  declarations: [
    ListCategoriesComponent,
    AddCategoriesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoriesRoutingModule,
    ReactiveFormsModule
  ]
})
export class CategoriesModule { }
