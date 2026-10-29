import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { CartItemCard } from './CartItemCard';

it('zeigt Menge, Einzelpreis und Summe', () => {
  render(
    <CartItemCard
      name="Kaffeebohnen"
      priceInCents={1290}
      quantity={2}
      variant="default"
      note="Frisch geröstet"
    />
  );
  expect(screen.getByText('2 × 12,90 € = 25,80 €')).toBeInTheDocument();
  expect(screen.getByText('Frisch geröstet')).toBeInTheDocument();
});

it('blendet die Notiz in der kompakten Variante aus', () => {
  render(
    <CartItemCard
      name="Kaffeebohnen"
      priceInCents={1290}
      quantity={2}
      variant="compact"
      note="Frisch geröstet"
    />
  );
  expect(screen.queryByText('Frisch geröstet')).not.toBeInTheDocument();
});
