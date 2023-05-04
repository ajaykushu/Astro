import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LoginRequest } from '../../Model/LoginModel/LoginRequest';
import { LoginResponse } from '../../Model/LoginModel/LoginResponse';
import { User } from '../../Model/LoginModel/User';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  tokenSubject: BehaviorSubject<string | null>;
  SetProfileData(data: User | undefined) {
      this.name = data?.name;
      this.profilePhoto = data?.picture;
      this.email = data?.email;
  }
  GetLoggedInStatus(): Observable<string|null> {
    return this.tokenSubject.asObservable()
  }

  constructor(private http: HttpClient, private router: Router) {
    this.tokenSubject = new BehaviorSubject(localStorage.getItem('token'));
  }
 
  
  
  SetToken(token: string) {
    console.log(token);
    if (token) {
      localStorage.setItem('token', token);
      this.tokenSubject.next(token);
    }
  };
  Logout() {
    localStorage.clear();
    this.tokenSubject.next(null);
    this.token = undefined;

  }
  
  
  public token?: string;
  public name?: string;
  public profilePhoto?: string;
  public email?: string;

}

