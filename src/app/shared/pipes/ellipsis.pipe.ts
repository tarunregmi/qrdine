import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(line: string, words = 10): string {
    let realult: (string | string[]) = line.split(" ");

    if (realult.length < words) return line;

    realult.length = words;
    realult = realult.join(" ") + " ...";
    
    return realult;
  }

}
