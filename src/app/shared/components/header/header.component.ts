import { FormControl } from "@angular/forms";
import { Component } from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent {
  constructor(
    public authenticationService: AuthenticationService,
    public router: Router
  ) {}

  panelOpenState = false;

  mode = new FormControl("over");
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h =>
    h.test(window.location.host)
  );

  logout() {
    console.log("init");
    this.authenticationService.logout();
    this.router.navigate(["login"]);
  }
}
