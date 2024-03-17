import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'npr'
})
export class NprPipe implements PipeTransform {

  transform(money: number): string {
    return `रु ${new Intl.NumberFormat('en-IN').format(money)}`;
  }

}
