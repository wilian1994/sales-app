import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListPaymentTypeComponent } from "./list-payment-type/list-payment-type.component";
import { AuthGuard } from "src/app/shared/guard/AuthGuard";

const routes: Routes = [
  {
    path: "paymentTypes",
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: ListPaymentTypeComponent
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
export class PaymentTypesRoutingModule {}
