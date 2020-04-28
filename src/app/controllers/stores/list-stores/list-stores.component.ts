import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StoresService } from '../stores.service';
import { Store } from 'src/app/shared/models/Store';

@Component({
  selector: 'app-list-stores',
  templateUrl: './list-stores.component.html',
  styleUrls: ['./list-stores.component.css']
})
export class ListStoresComponent implements OnInit {

  service: any;

  constructor(
    private storesService: StoresService,
  ) { }

  ngOnInit() {
    this.service = this.storesService;

  }

}
