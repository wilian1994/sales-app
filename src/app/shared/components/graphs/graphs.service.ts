import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GraphsService {
  constructor(protected httpClient: HttpClient) {}

  listSalesMonth(business: string): Observable<any> {
    let params = new HttpParams();
    params = params.append("business", business);
    return this.httpClient
      .get(`${environment.API}salesMonth`, { params: params })
      .pipe
      // delay(2000),
      ();
  }
}
