import { expect, it } from 'vitest';
import { PlaceOrderInput } from './placeOrderInput';

it('accepts an order with one item', () => {
  expect(
    PlaceOrderInput.safeParse({
      customerId: 'c1',
      items: [{ productId: 'p1', quantity: 2 }],
    }).success
  ).toBe(true);
});

it('rejects unknown fields', () => {
  expect(
    PlaceOrderInput.safeParse({ customerId: 'c1', items: [], coupon: 'X' })
      .success
  ).toBe(false);
});
