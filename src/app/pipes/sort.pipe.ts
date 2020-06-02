import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  public transform(array: any[], reverse: boolean = false, prop?: string) {
    // if (!value || order === '' || !order) { return value; } // no array
    // if (value.length <= 1) { return value; } // array with only one item
    // if (!column || column === '') {
    //   if(order==='asc'){return value.sort()}
    //   else{return value.sort().reverse();}
    // } // sort 1d array
    // return orderBy(value, [column], [order]);
    if (!Array.isArray(array)) {
      return array;
    }
    if (array.length) {
      let sortedArray: any[];
      if (typeof array[0] === 'object' && prop) {
        sortedArray = array.sort((a, b) => a[prop].toString().localeCompare(b[prop].toString()));
      }
      if (reverse) {
        return sortedArray.reverse();
      } else {
        return sortedArray;
      }
    }
    return array;
  }

}
