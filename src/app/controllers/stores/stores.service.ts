import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from 'src/app/shared/services/crud.service';
import { environment } from 'src/environments/environment';
import { Store } from 'src/app/shared/models/Store';

@Injectable({
  providedIn: 'root'
})

export class StoresService extends CrudService<Store> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, `${environment.API}stores`);
  }
}
