import { Component, Inject, OnInit } from '@angular/core';
import { LoginRequest } from '../Model/LoginModel/LoginRequest';
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import { Alert, Type } from '../alert/AlertModels';
import * as alertify  from '../alert/alert.component'
import { AlertService } from '../alert/AlertifyService/AlertService';
import { SocialLogin } from '../Helper/SocialLogin';
import { LoginService } from '../Service/LoginService/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [SocialLogin]
})
export class LoginComponent implements OnInit {
  
  public iconNames = IconNamesEnum;
  constructor(private alert: AlertService, private slogin: SocialLogin, private account: LoginService, private route: Router) {
    console.log(account.GetLoggedInStatus());
    if (account.GetLoggedInStatus()) {
      route.navigate(["/list"])
    }
  }
  public loginObj: LoginRequest = new LoginRequest;


  ngOnInit(): void {
   
  }

  loginValidate() {
    //alert("hello");
    if (this.loginObj.userName && this.loginObj.password) {
      //we have both entires
      
      
    }
    else {
      
    }
  }

  Dologin() {

  }

  async Authenticate() {
    await this.slogin.AuthFlow();
  }


}


