import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AlertService } from "../alert/AlertifyService/AlertService";
import { Alert, Type } from "../alert/AlertModels";
import { LoginService } from "../Service/LoginService/login.service";

@Injectable({
  providedIn: 'root',
  useExisting: [LoginService, AlertService]
  })
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private login: LoginService, private alert: AlertService
    ) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      console.log(err);
      if (err.status == 401) {
        this.login.Logout();
      }
      if (err.status == 404||err.status==0) {
        this.alert.notify(<Alert>{
          description: "Some Error Occured Try after some Time",
          title: "Information",
          type: Type.error
        })
        
      }
      return throwError(err);
    }));

  }
}
