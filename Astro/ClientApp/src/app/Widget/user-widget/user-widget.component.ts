import { Component, Input, OnInit } from '@angular/core';
import { IconNamesEnum } from 'ngx-bootstrap-icons';



@Component({
  selector: 'app-user-widget',
  templateUrl: './user-widget.component.html',
  styleUrls: ['./user-widget.component.css']
})
export class UserWidgetComponent implements OnInit {

  constructor() { }
  icon = IconNamesEnum.StarFill;
  @Input() ratingvisible: boolean = true;
  @Input() Rating: number = 4.5;
  @Input() AvtaarUrl: string = "../../../assets/7309681.jpg";
  ngOnInit(): void {
  }

}
