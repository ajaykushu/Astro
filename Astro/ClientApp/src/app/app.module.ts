import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './Service/LoginService/login.service';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './Helper/AuthGuard';
import { AlertComponent } from './alert/alert.component';
import { MatButtonModule } from '@angular/material/button';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import {
  x, xLg, exclamationTriangle, infoCircle, arrowUp, arrowDown
  , cloudArrowDown, cloudArrowUp, exclamationCircle, funnel, starFill
} from 'ngx-bootstrap-icons';

import { AlertService } from './alert/AlertifyService/AlertService';
import { ListComponent } from './list/list.component';
import { UserWidgetComponent } from './Widget/user-widget/user-widget.component';
import { LoginFromSocialComponent } from './Helper/token.component';
import { SocialLogin } from './Helper/SocialLogin';
import {  ServerEndPoint } from './Helper/ServerEndpint.Service';
import { ErrorInterceptor } from './Helper/ErrorInterceptor';



// Select some icons (use an object, not an array)
const icons = {
  xLg,
  x,
  exclamationTriangle,
  cloudArrowDown,
  cloudArrowUp,
  exclamationCircle,
  infoCircle,
  arrowUp,
  arrowDown,
  funnel, starFill
};




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AlertComponent,
    ListComponent,
    UserWidgetComponent,
    LoginFromSocialComponent
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    NgxBootstrapIconsModule.pick(icons),



    RouterModule.forRoot([
      { path: '', component: LoginComponent}, { path: 'login', component: LoginComponent },
      { path: 'setToken', component: LoginFromSocialComponent },
      { path: 'list', component: ListComponent, canActivate: [AuthGuard] },
    ])
  ],
  exports: [],
  providers: [ServerEndPoint,
     { provide: APP_INITIALIZER, useFactory: laodServerPaths, deps: [ServerEndPoint], multi:true }
    , LoginService, AlertService, AuthGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {


}

function laodServerPaths(serverEndPoint: ServerEndPoint) {
  return () => serverEndPoint.loadPaths().then(paths => {
    if (paths)
    ServerEndPoint.paths = paths;
  });
}


