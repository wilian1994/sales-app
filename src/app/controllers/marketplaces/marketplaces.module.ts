import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListMarketplacesComponent } from './list-marketplaces/list-marketplaces.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MarketplacesRoutingModule } from './marketplaces.routing.module';

@NgModule({
  declarations: [
    ListMarketplacesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MarketplacesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class MarketplacesModule { }
