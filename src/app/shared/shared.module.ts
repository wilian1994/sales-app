import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ErrorMsgComponent } from './components/error-msg/error-msg.component';
import { InputFieldComponent } from './components/input-field/input-field.component';


@NgModule({
  declarations: [AlertModalComponent, ConfirmModalComponent, ErrorMsgComponent, InputFieldComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AlertModalComponent,
    ConfirmModalComponent,
    ErrorMsgComponent,
    InputFieldComponent,
  ],
    entryComponents: [
      AlertModalComponent,
      ConfirmModalComponent
    ]
})
export class SharedModule {

}
