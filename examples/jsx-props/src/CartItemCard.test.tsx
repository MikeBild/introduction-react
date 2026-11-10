import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { CartItemCard } from './CartItemCard';

it('shows quantity, unit price and total', () => {
  render(
    <CartItemCard
      name="Drehmomentschlüssel"
      priceCents={8990}
      quantity={2}
      variant="default"
      note="Mit Kalibrierschein"
    />
  );
  expect(screen.getByText('2 × 89,90 € = 179,80 €')).toBeInTheDocument();
  expect(screen.getByText('Mit Kalibrierschein')).toBeInTheDocument();
});

it('hides the note in the compact variant', () => {
  render(
    <CartItemCard
      name="Drehmomentschlüssel"
      priceCents={8990}
      quantity={2}
      variant="compact"
      note="Mit Kalibrierschein"
    />
  );
  expect(screen.queryByText('Mit Kalibrierschein')).not.toBeInTheDocument();
});
