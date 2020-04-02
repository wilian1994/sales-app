import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/Category';
import { environment } from 'src/environments/environment';
import { delay, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OldCategoriesService {

  private readonly categoryUrl: string = `${environment.API}categories`;

  constructor(private httpClient: HttpClient) { }

  listAll(){
    return this.httpClient.get<Category[]>(this.categoryUrl)
      .pipe(
        // delay(2000),
      );
  }

  private create(category: Category): Observable<Category>{
    return this.httpClient.post<Category>(this.categoryUrl, category).pipe(take(1));
  }

  delete(id): Observable<Category>{
    return this.httpClient.delete<Category>(`${this.categoryUrl}/${id}`).pipe(take(1));
  }

  view(id: string): Observable<Category>{
    return this.httpClient.get<Category>(`${this.categoryUrl}/${id}`).pipe(take(1));
  }

  private edit(category: Category): Observable<Category>{
    return this.httpClient.put<Category>(this.categoryUrl, category).pipe(take(1));
  }

  save(category: Category){
    if(category._id){
      return this.edit(category)
    }
    return this.create(category);
  }


}
