import { Marketplace } from './../../../shared/models/Marketplace';
import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from '../marketplaces.service';

@Component({
  selector: 'app-list-marketplaces',
  templateUrl: './list-marketplaces.component.html',
  styleUrls: ['./list-marketplaces.component.css']
})
export class ListMarketplacesComponent implements OnInit {

  service: any;

  constructor(
    private marketplaces: MarketplaceService,
  ) { }

  ngOnInit() {
    this.service = this.marketplaces;

  }

}
