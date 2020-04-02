import { FormValidation } from './../../form.validation';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent  {

  @Input() control: FormControl;
  @Input() label: string;

  constructor() {}

  get errorMsg(){
    for(const propertyName in this.control.errors){
      if(this.control.errors.hasOwnProperty(propertyName) ) {
        return FormValidation.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }

  // hasError(control: AbstractControl, errorName: string): boolean {
  //   return control.hasError(errorName )
  // }

}
