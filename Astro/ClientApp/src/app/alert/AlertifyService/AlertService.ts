import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { IconNamesEnum } from "ngx-bootstrap-icons";
import { Observable, Subject } from "rxjs";
import { Alert, AlertConfig, KeyValue, Type } from "../AlertModels";

@Injectable({
  providedIn:'root'
})
export class AlertService  {
  private colorTypeMap: KeyValue = {}
  constructor() {
    this.colorTypeMap[Type.info] = [IconNamesEnum.InfoCircleFill, 'green'];
    this.colorTypeMap[Type.download] = [IconNamesEnum.CloudArrowDown, 'blue'];
    this.colorTypeMap[Type.upload] = [IconNamesEnum.CloudArrowUp, 'blue'];
    this.colorTypeMap[Type.warning] = [IconNamesEnum.ExclamationCircle, 'yellow'];
    this.colorTypeMap[Type.error] = [IconNamesEnum.ExclamationTriangle, 'red'];
  }
  private Configsubject = new Subject<AlertConfig>();
  private Alertsubject = new Subject<Alert>();


  public setConfiguarion(alertConfig: AlertConfig): void {
    this.Configsubject.next(<AlertConfig>{
      autoclose: alertConfig.autoclose,
      counter: alertConfig.counter,
      Position: alertConfig.Position,
      showTimer: alertConfig.showTimer
     });
   
  }

  public getConfig() {
    return this.Configsubject.asObservable();
  }

  public notify(alert: Alert) {
    this.Alertsubject.next(alert);
    
  }
  public getNotifcation() {
    return this.Alertsubject.asObservable();
  }

  public getColor(type: Type) {
    return this.colorTypeMap[type];
  }
  
}
