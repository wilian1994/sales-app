import { Injectable } from "@angular/core";
import { AuthenticationService } from "./services/authentication.service";
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser: any = this.authenticationService.currentUserValue;

    if (currentUser && currentUser.data.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.data.token}`
        }
      });
    }

    console.log(request);
    return next.handle(request);
  }
}
