import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  title: string;
  link: string;
  subtitle: string;
  data$: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onNew() {
    this.router.navigate([this.link]);
  }

}
