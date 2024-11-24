import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intlCurrency',
  standalone: true
})

export class intlCurrency implements PipeTransform {
  transform(value: number, currency = 'EUR', language = 'es-ES'): string {
    return new Intl.NumberFormat(language, {
      style: 'currency',
      currency: currency,
    }).format(value);
  }
}

