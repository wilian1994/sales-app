import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../components/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(
    private modalService: BsModalService
  ) { }

  private showAlert(message: string, type: AlertTypes, dismissionTimeout?: number){
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    setTimeout(() => {
      bsModalRef.hide()
    }, 3000);

    if(dismissionTimeout){
      setTimeout(() => {
        bsModalRef.hide()
      }, dismissionTimeout);
    }
  }

  showAlertSucess(message: string){
    this.showAlert(message, AlertTypes.SUCCESS)
  }

  showAlertDanger(message: string){
    this.showAlert(message, AlertTypes.DANGER)
  }

  showConfirm(title: string, message: string, btnCancel?: string, btnConfirm?: string){
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    const  bsContent: any=  bsModalRef.content;
    bsContent.title = title;
    bsContent.message = message;
    bsContent.btnCancel = btnCancel;
    bsContent.btnConfirm = btnConfirm;

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }
}
