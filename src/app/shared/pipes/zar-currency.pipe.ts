import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zarCurrency'
})
export class ZarCurrencyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
