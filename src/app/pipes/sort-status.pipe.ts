import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortStatus'
})
export class SortStatusPipe implements PipeTransform {

  transform(array: any[], args?: any): any {
    console.log(array,"sortedpipe")
    return null;
  }

}
