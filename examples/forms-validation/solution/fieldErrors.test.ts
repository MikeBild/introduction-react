import { expect, it } from 'vitest';
import { toFieldErrors } from '../src/fieldErrors';
import { PlaceOrderInput } from '../src/placeOrderInput';

it('turns the path of an issue into the key of the field', () => {
  const result = PlaceOrderInput.safeParse({
    customerId: '',
    items: [{ productId: 'p1', quantity: 1.5 }],
  });
  expect(result.success).toBe(false);
  if (result.success) return;
  expect(toFieldErrors(result.error.issues)).toEqual({
    customerId: 'Bitte wähle einen Kunden',
    'items.0.quantity': 'Bitte eine ganze Zahl ab 1',
  });
});
