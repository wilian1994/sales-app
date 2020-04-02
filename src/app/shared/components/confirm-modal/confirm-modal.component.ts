import { BsModalRef } from 'ngx-bootstrap/modal';
 import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() btnCancel: string = 'Cancelar';
  @Input() btnConfirm: string = 'Confirmar';

  confirmResult: Subject<boolean>;

  constructor(
    private bsModalRef: BsModalRef,
  ) {}

  ngOnInit() {
    this.confirmResult = new Subject();
  }

  onClose(){
    this.confirmAndClose(false )
  }

  onConfirm(){
    this.confirmAndClose(true)
  }

  private confirmAndClose(value: boolean){
    this.confirmResult.next(value);
    this.bsModalRef.hide();
  }

}
