import { AddCategoriesNewComponent } from './add-categories-new/add-categories-new.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { CategoriesRoutingModule } from './categories.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.example.module';

@NgModule({
  declarations: [
    ListCategoriesComponent,
    AddCategoriesComponent,
    AddCategoriesNewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ]
})
export class CategoriesModule { }
