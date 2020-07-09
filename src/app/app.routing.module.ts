import { NgModule } from "@angular/core";
import { Routes, RouterModule, UrlSegment } from "@angular/router";
import { GraphsComponent } from "./shared/components/graphs/graphs.component";
import { LoginComponent } from "./controllers/login/login.component";
import { AuthGuard } from "./shared/guard/AuthGuard";
import { Route } from "@angular/compiler/src/core";
import { SalesComponent } from "./controllers/sales/sales.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },

  {
    path: "",
    component: GraphsComponent,
    children: [
      {
        path: "initial",
        component: GraphsComponent
      },
      {
        path: "",
        component: GraphsComponent
      },
      {
        path: "sales",
        component: SalesComponent
      },
      {
        path: "stores",
        loadChildren: () =>
          import("./controllers/stores/stores.module").then(m => m.StoresModule)
      },
      {
        path: "categories",
        canLoad: [AuthGuard],
        loadChildren: () =>
          import("./controllers/categories/categories.module").then(
            m => m.CategoriesModule
          )
      },
      {
        path: "marketplaces",
        loadChildren: () =>
          import("./controllers/marketplaces/marketplaces.module").then(
            m => m.MarketplacesModule
          )
      },
      {
        path: "paymentTypes",
        loadChildren: () =>
          import("./controllers/paymentTypes/paymentTypes.module").then(
            m => m.PaymentTypesModule
          )
      },
      {
        path: "products",
        loadChildren: () =>
          import("./controllers/products/products.module").then(
            m => m.ProductsModule
          )
      },
      {
        path: "orders",
        loadChildren: () =>
          import("./controllers/orders/orders.module").then(m => m.OrdersModule)
      }
    ],
    canActivate: [AuthGuard]
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: "canLoadTeamSection",
      useValue: (route: Route, segments: UrlSegment[]) => true
    }
  ]
})
export class AppRoutingModule {}
