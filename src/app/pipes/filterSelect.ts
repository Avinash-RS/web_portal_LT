import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'filter_matselect'
})
export class FilterPipeforselect implements PipeTransform {
  /*
 @param
 list    array
 args    string
 data    array
 @Output
 Filters the array with args
 */
  transform(list: any, args: string[]): string {
    if (!args.length) {
      return list;
    }
    return list.map((lock) => {
      lock.disabled =args.indexOf(lock.name) > -1
      return lock;
    });
  }
}
