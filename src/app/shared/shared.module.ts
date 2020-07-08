import { CustomCurrencyMaskConfig } from "./utils/CustomCurrencyMaskConfig";
import { CURRENCY_MASK_CONFIG } from "ng2-currency-mask";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { MaterialModule } from "./../material.example.module";
import { FooterComponent } from "./components/footer/footer.component";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlertModalComponent } from "./components/alert-modal/alert-modal.component";
import { ConfirmModalComponent } from "./components/confirm-modal/confirm-modal.component";
import { ErrorMsgComponent } from "./components/error-msg/error-msg.component";
import { InputFieldComponent } from "./components/input-field/input-field.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CardComponent } from "./components/card/card.component";
import { DialogModalComponent } from "./components/dialog-modal/dialog-modal.component";
import { DialogPendingComponent } from "./components/dialog-pending/dialog-pending.component";
import { MatTableComponent } from "./components/mat-table/mat-table.component";
import { TranslateModule } from "@ngx-translate/core";
import { GraphsComponent } from "./components/graphs/graphs.component";

@NgModule({
  declarations: [
    AlertModalComponent,
    ConfirmModalComponent,
    ErrorMsgComponent,
    InputFieldComponent,
    CardComponent,
    DialogModalComponent,
    DialogPendingComponent,
    MatTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CurrencyMaskModule,
    TranslateModule
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  exports: [
    AlertModalComponent,
    ConfirmModalComponent,
    ErrorMsgComponent,
    InputFieldComponent,
    CardComponent,
    MatTableComponent
  ],
  entryComponents: [
    AlertModalComponent,
    ConfirmModalComponent,
    DialogModalComponent,
    DialogPendingComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
