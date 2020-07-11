import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { CrudService } from "src/app/shared/services/crud.service";
import { environment } from "src/environments/environment";
import { Store } from "src/app/shared/models/Store";
import { PaymentType } from "src/app/shared/models/PaymentType";
import { Product } from "src/app/shared/models/Product";
import { Sale } from "src/app/shared/models/Sale";

@Injectable({
  providedIn: "root"
})
export class SalesService extends CrudService<Sale> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, `${environment.API}sales`);
  }

  listAllByStatus(status: any, business: string) {
    let params = new HttpParams();
    params = params.append("business", business);
    params = params.append("status", status);
    return this.httpClient
      .get<Sale[]>(`${environment.API}sales/`, {
        params: params
      })
      .pipe
      // delay(2000),
      ();
  }
}
