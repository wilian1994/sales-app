import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertModalService } from "./../../../shared/services/alert-modal.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { StoresService } from "../stores.service";
import { Store } from "src/app/shared/models/Store";
import { Location } from "@angular/common";

@Component({
  selector: "app-add-stores",
  templateUrl: "./add-stores.component.html",
  styleUrls: ["./add-stores.component.css"]
})
export class AddStoresComponent implements OnInit {
  register: FormGroup;
  submitted: boolean = false;
  id: string;

  constructor(
    private formBuilder: FormBuilder,
    private storesService: StoresService,
    private alertModal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    if (this.id) {
      this.storesService
        .view(this.id)
        .subscribe((store: Store) => this.createForm(store));
      return;
    }

    this.createForm();
  }

  private createForm(store?: Store) {
    console.log("store", store);
    this.register = this.formBuilder.group({
      _id: [store ? store._id : null, Validators.required],
      name: [store ? store.name : "", Validators.required]
    });
  }

  save() {
    this.submitted = true;
    if (this.register.valid) {
      const data = this.register.value;

      this.storesService.save(data).subscribe(
        // tslint:disable-next-line:no-console
        () => {
          this.alertModal.showAlertSucess("Loja salvo/editado com sucesso");
          this.location.back();
        },
        err => console.error("Erro ao cadastrar loja ", err)
      );
    }
  }

  hasError(field: string) {
    return this.register.get(field).errors;
  }

  verifyValidTouched(field) {
    return !this.register.get(field).valid && this.register.get(field).touched;
  }

  onCancel() {
    this.submitted = false;
    this.register.reset();
    this.router.navigateByUrl("/stores");
  }
}
