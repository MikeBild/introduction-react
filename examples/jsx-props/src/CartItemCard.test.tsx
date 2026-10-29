import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { CartItemCard } from './CartItemCard';

it('zeigt Menge, Einzelpreis und Summe', () => {
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

it('blendet die Notiz in der kompakten Variante aus', () => {
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
