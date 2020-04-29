import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from 'src/app/shared/services/crud.service';
import { environment } from 'src/environments/environment';
import { Order } from 'src/app/shared/models/Order';

@Injectable({
  providedIn: 'root'
})

export class OrdersService extends CrudService<Order> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, `${environment.API}orders`);
  }
}
