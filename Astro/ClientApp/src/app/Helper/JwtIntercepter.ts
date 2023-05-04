import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "../Service/LoginService/login.service";


@Injectable()
export class JwtIntercepter implements HttpInterceptor {
  constructor(private account: LoginService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let token = this.account.token;
    let isLoggedIn = this.account.GetLoggedInStatus();
    if(isLoggedIn && token)
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });

    return next.handle(req);
      
    }

}
