import { Component, Injectable, Input, OnInit } from '@angular/core';
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import { position, Type, KeyValue } from "../alert/AlertModels"
import { AlertService } from './AlertifyService/AlertService';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements  OnInit  {
  enum = IconNamesEnum;
  hidden: boolean=true;
  icon: IconNamesEnum = IconNamesEnum.ExclamationTriangle;
  title: string = "";
  description: string = "";
  containerclass = "alert-container"
  counter: number = 4;
  savecounter: number = 0;
  color = "";
  interval: any;
  showTimer=false;
  autoclose: boolean = true;
  colorTypeMap: KeyValue = {}

  constructor(private alert: AlertService) {
    this.alert.getConfig().subscribe(config => {
      this.autoclose = config.autoclose;
      this.counter = config.counter;
      this.showTimer = config.showTimer;
      this.setPosition(config.Position);
      console.log(config);
      this.savecounter = config.counter;
    });
  }
 
  public ngOnInit(): void {
   
    this.alert.getNotifcation().subscribe(item => {
      this.show(item.title, item.description, item.type);
    })

  }
 
  
  setPosition(pos: position) {
    console.log(pos);
    this.containerclass = this.containerclass + " "+pos ;
  }
  close() {
    this.containerclass = this.containerclass + " close";
    var p = new Promise(resolve => setTimeout(() => this.hidden=true, 200));
   
  }
  public show(title: string, description: string, type: Type) {
    this.hidden = false;
    this.icon = this.alert.getColor(type)[0];
    this.color = this.alert.getColor(type)[1];
    this.startTimer();
    this.title = title;
    this.description = description;
    if (this.autoclose)
      var p = new Promise(resolve => setTimeout(() => { this.hidden = true; this.pauseTimer() }, this.counter * 1000));
    console.log(this.hidden);
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.counter > 0) {
        this.counter--;
      } else {
        this.counter = this.savecounter;
      }
    }, 1000)
  }
  pauseTimer() {
    clearInterval(this.interval);
  }
}

