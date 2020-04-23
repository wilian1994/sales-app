import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ErrorMsgComponent } from './components/error-msg/error-msg.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [AlertModalComponent, ConfirmModalComponent, ErrorMsgComponent, InputFieldComponent, CardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AlertModalComponent,
    ConfirmModalComponent,
    ErrorMsgComponent,
    InputFieldComponent,
    CardComponent
  ],
    entryComponents: [
      AlertModalComponent,
      ConfirmModalComponent
    ]
})
export class SharedModule {

}
