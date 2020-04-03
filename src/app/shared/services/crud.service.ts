import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class CrudService<T> {


  constructor(protected httpClient: HttpClient, private API_URL: string) { }

  listAll(){
    return this.httpClient.get<T[]>(this.API_URL)
      .pipe(
        // delay(2000),
      );
  }

  private create(record: T): Observable<T>{
    return this.httpClient.post<T>(this.API_URL, record).pipe(take(1));
  }

  delete(id): Observable<T>{
    return this.httpClient.delete<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  view(id: string): Observable<T>{
    return this.httpClient.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  private edit(record: T): Observable<T>{
    return this.httpClient.put<T>(this.API_URL, record).pipe(take(1));
  }

  save(record: T){
    if(record['_id']){
      return this.edit(record)
    }
    return this.create(record);
  }
}