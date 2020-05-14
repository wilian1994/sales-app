import { MaterialModule } from './../material.example.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ErrorMsgComponent } from './components/error-msg/error-msg.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { DialogModalComponent } from './components/dialog-modal/dialog-modal.component';

@NgModule({
  declarations: [AlertModalComponent, ConfirmModalComponent, ErrorMsgComponent, InputFieldComponent, CardComponent, DialogModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
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
      ConfirmModalComponent,
      DialogModalComponent

    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule {

}
