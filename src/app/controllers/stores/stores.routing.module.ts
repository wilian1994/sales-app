import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListStoresComponent } from "./list-stores/list-stores.component";
import { AddStoresComponent } from "./add-stores/add-stores.component";
import { AuthGuard } from "src/app/shared/guard/AuthGuard";

const routes: Routes = [
  {
    path: "stores",
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: ListStoresComponent
      },
      {
        path: "register",
        component: AddStoresComponent
      },
      {
        path: "edit/:id",
        component: AddStoresComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoresRoutingModule {}
