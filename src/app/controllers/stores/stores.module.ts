import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddStoresComponent } from './add-stores/add-stores.component';
import { StoresRoutingModule } from './stores.routing.module';
import { ListStoresComponent } from './list-stores/list-stores.component';

@NgModule({
  declarations: [
    ListStoresComponent,
    AddStoresComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoresRoutingModule,
  ]
})
export class StoresModule { }
