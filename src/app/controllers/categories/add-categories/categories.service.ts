import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Category } from 'src/app/shared/models/Category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService extends CrudService<Category> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, `${environment.API}categories`);
  }

  listAllOrdersAwaiting(){
    return this.httpClient.get<Category[]>(`${environment.API}ordersByStatus`)
      .pipe(
        // delay(2000),
      );
  }

}
