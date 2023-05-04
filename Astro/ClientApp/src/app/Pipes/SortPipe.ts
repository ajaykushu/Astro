import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { SortType } from '../list/list.component';

export type SortOrder = 'asc' | 'desc';

@Injectable()
@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  async transform(value: any, sortOrder: SortType, sortKey: string) {
    if (!value) return value;
    
    value.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => {
      if (a[sortKey] < b[sortKey]) return -1;
      else if (a[sortKey] > b[sortKey]) return 1;
      else return 0;

    });
    if (sortOrder == SortType.ASC)
      return value;
    else
      return value.reverse();

    }
}
