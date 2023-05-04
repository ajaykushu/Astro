import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { catchError, map, Observable, switchMap } from "rxjs";
import { User } from "../Model/LoginModel/User";
import { Endponts, ServerEndPoint } from "./ServerEndpint.Service";

@Injectable({
  providedIn: 'root'
})
export class SocialLogin {
  
  readonly AUTH_URL: string = "https://accounts.google.com/o/oauth2/auth";
  readonly CLIENT_ID: string = "305717327998-6lmc9iodilel352o1ccd58ai71pv4ti1.apps.googleusercontent.com";
  readonly REDIRECT_URL: string = "http://localhost:4200/setToken";
  readonly SCOPES: string = "email profile";
  readonly PROJECT_ID: string = "testapp-240014"
  readonly ProfileURL: string = "https://www.googleapis.com/oauth2/v3/userinfo?access_token=";
 


  constructor(public http: HttpClient) {
    
  }
  

  async AuthFlow() {
    let headerDict: { [Key: string] :string};
    headerDict =  {
      "client_id": this.CLIENT_ID,
      "project_id": this.PROJECT_ID,
      "redirect_uri": this.REDIRECT_URL,
      "response_type": "code",
      "access_type": "offline",
      "scope": this.SCOPES,
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, x - client - key, x - client - token, x - client - secret, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "include_granted_scopes": "true",
      "state": "pass-through value"
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', this.AUTH_URL);

    // Add form parameters as hidden input values.
    for (var p in headerDict) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', headerDict[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    await form.submit();
    
  }

  

  GetAccessToken(code: string): Observable<AuthResponse> {
   
    let path = ServerEndPoint.paths;
    let mod = path.Modules?.find((x) => x.Name == 'Authentication');
    let endpoint = mod?.Endpoints?.find((y) => y.name == "getAccessToken")?.path;
    let url = path.BasePath + "/" + mod?.Name + endpoint + "?code=" + code;
    console.log(url);
    return this.http.get<AuthResponse>(url);
  }
}




export class AuthResponse {
  accessToken: string = "";
  identityToken: string = "";
  scope:string=""

}
