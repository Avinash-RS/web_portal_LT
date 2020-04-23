import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'filter_not_Unique'
})
export class FilterPipeWithoutUnique implements PipeTransform {
     /*
    @param
    list    array
    args    string
    data    array
    @Output
    Filters the array with args
    */
   transform(list: any, args: string, data: any): string {
    if (!args) {
        return list;
    }
    return list.filter((lock) => {
      return data.some((element) => {
          return (lock[element].toLowerCase().match(args.toLowerCase()));
      });
    });
}
}
