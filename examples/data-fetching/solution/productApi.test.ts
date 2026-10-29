import { expect, it } from 'vitest';
import { ProductSchema } from './productApi';

it('akzeptiert ein gültiges Produkt', () => {
  expect(
    ProductSchema.parse({ id: 'p1', name: 'Tasse', priceInCents: 900 })
  ).toEqual({ id: 'p1', name: 'Tasse', priceInCents: 900 });
});

it('lehnt einen Preis als String ab', () => {
  expect(
    ProductSchema.safeParse({ id: 'p1', name: 'Tasse', priceInCents: '9' })
      .success
  ).toBe(false);
});
