import { intlCurrency } from './intl-currency.pipe';

describe('IntlCurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new intlCurrency();
    expect(pipe).toBeTruthy();
  });
});
