import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskingPipe'
})
export class MaskingPipePipe implements PipeTransform {

  transform(number: any, visibleDigits: number = 4): any {
    let maskedSection = number.slice(0, -visibleDigits);
    let visibleSection = number.slice(-visibleDigits);
    return maskedSection.replace(/./g, '*') + visibleSection;
    // return null;
  }

}
