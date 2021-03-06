import { take } from "rxjs/operators";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

export class CrudService<T> {
  public authentication: AuthenticationService;
  constructor(protected httpClient: HttpClient, private API_URL: string) {}

  listAll(business, status): Observable<T[]> {
    let params = new HttpParams();
    params = params.append("business", business);
    params = params.append("status", status);
    return this.httpClient
      .get<T[]>(this.API_URL, {
        params: params
      })
      .pipe
      // delay(2000),
      ();
  }

  listByBusiness(business: any): Observable<T[]> {
    return this.httpClient
      .get<T[]>(`${this.API_URL}/businesses/${business}`)
      .pipe
      // delay(2000),
      ();
  }

  private create(record: T): Observable<T> {
    return this.httpClient.post<T>(this.API_URL, record).pipe(take(1));
  }

  delete(id): Observable<T> {
    return this.httpClient.delete<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  view(id: string): Observable<T> {
    return this.httpClient.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  orderConfirmed(record: T): Observable<T> {
    return this.httpClient
      .post<T>(`${this.API_URL}/confirmed`, record)
      .pipe(take(1));
  }

  completedSale(record: T) {
    return this.httpClient
      .post<T[]>(`${this.API_URL}/completed`, record)
      .pipe
      // delay(2000),
      ();
  }

  private edit(record: T): Observable<T> {
    return this.httpClient.put<T>(this.API_URL, record).pipe(take(1));
  }

  save(record: T) {
    if (record["_id"]) {
      return this.edit(record);
    }
    return this.create(record);
  }

  listBySearch(config: any): Observable<T[]> {
    return this.httpClient.get<T[]>(this.API_URL, { params: config });
  }
}
