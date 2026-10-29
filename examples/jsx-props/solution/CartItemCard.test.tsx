import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { CartItemCard } from './CartItemCard';

it('zeigt Menge, Einzelpreis und Summe', () => {
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

it('nimmt ohne Angabe die Menge 1', () => {
  render(<CartItemCard name="Hammer" priceCents={1290} />);
  expect(screen.getByText('1 × 12,90 € = 12,90 €')).toBeInTheDocument();
});

it('blendet die Notiz in der kompakten Variante aus', () => {
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

it('markiert die hervorgehobene Variante', () => {
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
