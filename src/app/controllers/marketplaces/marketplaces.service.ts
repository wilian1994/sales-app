import { Marketplace } from './../../shared/models/Marketplace';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { CrudService } from 'src/app/shared/services/crud.service';

@Injectable({
  providedIn: 'root'
})

export class MarketplaceService extends CrudService<Marketplace> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, `${environment.API}marketplaces`);
  }
}
