import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GraphsService {
  constructor(protected httpClient: HttpClient) {}

  listSalesMonth(): Observable<any> {
    return this.httpClient
      .get(`${environment.API}salesMonth`)
      .pipe
      // delay(2000),
      ();
  }
}
