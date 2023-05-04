import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../Service/LoginService/login.service";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private account: LoginService, private router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.account.GetLoggedInStatus().subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          resolve(true);
        } else {
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });

  }


}


