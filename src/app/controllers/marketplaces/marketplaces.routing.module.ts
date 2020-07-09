import { ListMarketplacesComponent } from "./list-marketplaces/list-marketplaces.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/shared/guard/AuthGuard";

const routes: Routes = [
  {
    path: "marketplaces",
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: ListMarketplacesComponent
      }
      // {
      //   path: 'register',
      //   component: AddStoresComponent,
      // },
      // {
      //   path: 'edit/:id',
      //   component: AddStoresComponent,
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplacesRoutingModule {}
