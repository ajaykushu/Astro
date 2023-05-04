import { Component, OnInit } from '@angular/core';
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import { SortPipe } from '../Pipes/SortPipe';
import { TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [SortPipe, TitleCasePipe]
})
export class ListComponent implements OnInit {
 
  constructor(private sortPipe: SortPipe) { }
  displayedColumns: Columns[] = [];
  selectedCoulums:string[] =[];
  ngOnInit(): void {
    this.displayedColumns = [{ name: 'id', sortable: true, order: SortType.ASC, icon: IconNamesEnum.ArrowDown, fitervalue: "" }, { name: 'name', sortable: true, order: SortType.ASC, icon: IconNamesEnum.ArrowDown, fitervalue: "" }, { name: 'age', sortable: true, order: SortType.ASC, icon: IconNamesEnum.ArrowDown, fitervalue: "" }];
    
  }

  
  //addother params in displayedcolumns
  
  dataSource = ELEMENT_DATA;
  pagination: Pagination = {
    currentPage: 1,
    itemPerPage: 10,
    pageCount:100
  }
  select(id: string, event: Event) {
   
    if ((event.target as HTMLInputElement).checked == true)
      this.selectedCoulums.push(id);
    else {
      let index = this.selectedCoulums.indexOf(id);
      this.selectedCoulums.splice(index, 1);
    }
   
  }

 

  selectAll() {
    
    this.selectedCoulums = [];
    this.selectedCoulums.push('*');

  }
  async sort(column: Columns) {
    this.dataSource = await this.sortPipe.transform(this.dataSource, column.order, column.name);
    if (column.order == SortType.ASC) {

      column.order = SortType.DSC;
      column.icon = IconNamesEnum.ArrowUp;
    }
    else {

      column.order = SortType.ASC;
      column.icon = IconNamesEnum.ArrowDown;
    }
  }

}
const ELEMENT_DATA: PeriodicElement[] = [
  { id: '1', age: 28, name: "shilpi" },
  { id: '2', age: 23, name: "ajay" },
  { id: '2', age: 23, name: "ajay" },
  { id: '2', age: 23, name: "ajay" },
  { id: '2', age: 23, name: "ajay" },
  { id: '2', age: 23, name: "ajay" },
  { id: '2', age: 23, name: "ajay" },
  { id: '2', age: 23, name: "ajay" },
  { id: '2', age: 23, name: "ajay" }, { id: '2', age: 23, name: "ajay" },
  { id: '2', age: 23, name: "ajay" },
  { id: '2', age: 23, name: "ajay" }, { id: '2', age: 23, name: "ajay" },
  { id: '2', age: 23, name: "ajay" },
  { id: '2', age: 23, name: "ajay" },
  { id: '2', age: 23, name: "ajay" },
];
export interface PeriodicElement {
  [key: string]: boolean | number | string;
  name: string;
  id: string;
  age: number;

}

export enum SortType {
  ASC,
  DSC
}


export interface Columns {
  [key: string]: boolean | number | string;
  name: string,
  sortable: boolean,
  order: SortType,
  icon: IconNamesEnum,
}

export interface Pagination {
  [key: string]: boolean | number | string;
  pageCount: number,
  itemPerPage: number,
  currentPage:number
}
