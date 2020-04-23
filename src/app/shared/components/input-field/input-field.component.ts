import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent {

  @Input() classCss;
  @Input() id: string;
  @Input() label: string;
  @Input() control;
  @Input() controlName: string;
  @Input() formGroup: FormGroup;

   get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
