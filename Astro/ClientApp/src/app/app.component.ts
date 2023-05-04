import { Component, OnInit } from '@angular/core';
import { AlertService } from './alert/AlertifyService/AlertService';
import { AlertConfig, position } from './alert/AlertModels';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor( private alert: AlertService) {
    
  }
  ngOnInit(): void {
    this.alert.setConfiguarion(<AlertConfig>{
      autoclose:true,
      counter: 4,
      Position: position.bottomleft,
      showTimer:true
    });
    }
}
