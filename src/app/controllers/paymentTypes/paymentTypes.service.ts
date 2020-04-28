import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from 'src/app/shared/services/crud.service';
import { environment } from 'src/environments/environment';
import { Store } from 'src/app/shared/models/Store';
import { PaymentType } from 'src/app/shared/models/PaymentType';

@Injectable({
  providedIn: 'root'
})

export class PaymentTypesService extends CrudService<PaymentType> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, `${environment.API}payments`);
  }
}
