import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header-material',
  templateUrl: './header-material.component.html',
  styleUrls: ['./header-material.component.css']
})
export class HeaderMaterialComponent implements OnInit {

  mode = new FormControl('over');
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  constructor() { }

  ngOnInit() {
  }

}
