import { convertMonthName } from '@/utils/convertMonthName';

describe('convertMonthName', () => {
  it('должна возвращать првильные имена месяцев', () => {
    expect(convertMonthName('January')).toBe('Янв');
    expect(convertMonthName('February')).toBe('Фев');
    expect(convertMonthName('March')).toBe('Март');
    expect(convertMonthName('April')).toBe('Апр');
    expect(convertMonthName('May')).toBe('Май');
    expect(convertMonthName('June')).toBe('Июнь');
    expect(convertMonthName('July')).toBe('Июль');
    expect(convertMonthName('August')).toBe('Авг');
    expect(convertMonthName('September')).toBe('Сент');
    expect(convertMonthName('October')).toBe('Окт');
    expect(convertMonthName('November')).toBe('Нояб');
    expect(convertMonthName('December')).toBe('Дек');
  });

  it('должна возвращать название на английском если передана неверная строка', () => {
    expect(convertMonthName('Hello')).toBe('Hello');
    expect(convertMonthName('january')).toBe('january');
  })
});
