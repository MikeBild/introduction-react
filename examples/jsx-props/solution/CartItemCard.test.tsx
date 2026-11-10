import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { CartItemCard } from './CartItemCard';

it('shows quantity, unit price and total', () => {
  render(
    <CartItemCard
      name="Drehmomentschlüssel"
      priceCents={8990}
      quantity={2}
      note="Mit Kalibrierschein"
    />
  );
  expect(screen.getByText('2 × 89,90 € = 179,80 €')).toBeInTheDocument();
  expect(screen.getByText('Mit Kalibrierschein')).toBeInTheDocument();
});

it('defaults to quantity 1 when none is given', () => {
  render(<CartItemCard name="Hammer" priceCents={1290} />);
  expect(screen.getByText('1 × 12,90 € = 12,90 €')).toBeInTheDocument();
});

it('hides the note in the compact variant', () => {
  render(
    <CartItemCard
      name="Drehmomentschlüssel"
      priceCents={8990}
      variant="compact"
      note="Mit Kalibrierschein"
    />
  );
  expect(screen.queryByText('Mit Kalibrierschein')).not.toBeInTheDocument();
});

it('marks the highlighted variant', () => {
  render(
    <CartItemCard
      name="Drehmomentschlüssel"
      priceCents={8990}
      variant="highlighted"
    />
  );
  expect(screen.getByRole('heading')).toHaveTextContent(
    '★ Drehmomentschlüssel'
  );
});
