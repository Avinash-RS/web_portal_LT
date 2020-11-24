import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskingPipe'
})
export class MaskingPipePipe implements PipeTransform {

  transform(value: any, visibleDigits: number = 4): any {
    const maskedSection = value.slice(0, -visibleDigits);
    const visibleSection = value.slice(-visibleDigits);
    return maskedSection.replace(/./g, '*') + visibleSection;
  }

}
