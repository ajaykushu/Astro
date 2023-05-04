import { IconNamesEnum } from 'ngx-bootstrap-icons';
import {  Injectable } from '@angular/core';
export enum Type {
  info = 'Info',
  error = 'Error',
  upload = 'Upload',
  download = "Download",
  warning = "Warning",
  progress = "progress"
}

export enum position {
  topleft = "topleft",
  topright = "topright",
  bottomleft = "bottomleft",
  centre = "centre",
  bottomright = "bottomright",
}
export interface KeyValue {
  [key: string]: [IconNamesEnum, string];
}


export class AlertConfig {
  counter: number = 4;
  showTimer = false;
  autoclose: boolean = false;
  Position: position = position.centre;
}


export class Alert {
  title: string = "";
  description: string = "";
  type: Type = Type.info;
}
