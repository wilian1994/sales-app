import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { CategoriesService } from './../add-categories/categories.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/shared/models/Category';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-categories-new',
  templateUrl: './add-categories-new.component.html',
  styleUrls: ['./add-categories-new.component.css']
})
export class AddCategoriesNewComponent implements OnInit {

  register: FormGroup;
  submitted: boolean = false;

  ngOnInit() {
    const category =  this.route.snapshot.data['category'];
    this.createForm(category);
  }

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private alertModal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  private createForm(category: Category){
    this.register = this.formBuilder.group({
      _id: [category._id],
      name: [category.name, Validators.required]
    })
  }

  private save(){
    this.submitted = true;
    if(this.register.valid){
      const data  = this.register.value;

      this.categoriesService.save(data)
      .subscribe(
        // tslint:disable-next-line:no-console
        ()  => {
          this.alertModal.showAlertSucess('Produto salvo/editado com sucesso');
          this.location.back();
        },
        err => console.error('Erro ao cadastrar categoria ', err)
      )
    }
  }

  hasError(field: string) {
    return this.register.get(field).errors;
  }

  verifyValidTouched(field){
    return !this.register.get(field).valid && this.register.get(field).touched;
  }

  onCancel(){
    this.submitted = false;
    this.register.reset();
    this.router.navigateByUrl("/categories");
  }

}
