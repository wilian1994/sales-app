import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { AlertModalService } from '../../services/alert-modal.service';
import { take, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  subtitle: string;

  @Input()
  service: any;

  @Input()
  link: string;

  @Input()
  data$: any;

  constructor(
    private router: Router,
    private alertService: AlertModalService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    console.log(this.data$)
  }

  onNew() {
    this.router.navigate([this.link]);
  }

  onEdit(id: string){
    this.router.navigate(['edit', id], {relativeTo: this.route});
  }

  onDelete(id: string){
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja removar este registro', 'Não', 'Sim');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.service.delete(id) : EMPTY)
    )
    .subscribe(
      () => this.service.listAll(),
      (err)  => alert('ERRO ao remover o produto')
    )
  }

}
