import { expect, it } from 'vitest';
import { PlaceOrderInput } from './placeOrderInput';

it('akzeptiert eine Bestellung mit einer Position', () => {
  expect(
    PlaceOrderInput.safeParse({
      customerId: 'c1',
      items: [{ productId: 'p1', quantity: 2 }],
    }).success
  ).toBe(true);
});

it('lehnt unbekannte Felder ab', () => {
  expect(
    PlaceOrderInput.safeParse({ customerId: 'c1', items: [], coupon: 'X' })
      .success
  ).toBe(false);
});
