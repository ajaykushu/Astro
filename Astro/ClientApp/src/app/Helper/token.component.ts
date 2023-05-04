import { query } from "@angular/animations";
import { HttpClient } from "@angular/common/http";
import { Component, Injectable, OnInit } from "@angular/core";
import { ActivatedRoute, DefaultUrlSerializer, Router, UrlSerializer, RoutesRecognized } from "@angular/router";
import { User } from "../Model/LoginModel/User";
import { LoginService } from "../Service/LoginService/login.service";
import { AuthResponse, SocialLogin } from "./SocialLogin";

@Component({
  template: "",
  providers: [SocialLogin]
})
export class LoginFromSocialComponent implements OnInit {

  constructor(private loginser: LoginService, private route: Router, private http: HttpClient, private socialLogin: SocialLogin) {
   
  }
    ngOnInit(): void {
      this.GetIdentity();
    }
  
  GetIdentity() {

    let frag = this.route.parseUrl(this.route.url).fragment?.split("&");
    var queryParam: {[Key: string]:string
    } = {};
    console.log(this.route.parseUrl(this.route.url).queryParams);
    frag?.forEach((item) => {
      let keyValue = item.split("=");
      let key = keyValue[0];
      let value = keyValue[1];
      queryParam[key] = value;
    });
    if (queryParam) {
      this.socialLogin.GetAccessToken(this.route.parseUrl(this.route.url).queryParams['code']).subscribe(data => {
        this.loginser.SetToken(data.accessToken);
        this.route.navigate(['/list']);
      }).add(() => {
        
      });
      
     
    }
   
  }
  

 

}


