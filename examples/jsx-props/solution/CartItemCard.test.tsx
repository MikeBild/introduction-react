import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { CartItemCard } from './CartItemCard';

it('zeigt Menge, Einzelpreis und Summe', () => {
  render(
    <CartItemCard
      name="Kaffeebohnen"
      priceInCents={1290}
      quantity={2}
      note="Frisch geröstet"
    />
  );
  expect(screen.getByText('2 × 12,90 € = 25,80 €')).toBeInTheDocument();
  expect(screen.getByText('Frisch geröstet')).toBeInTheDocument();
});

it('nimmt ohne Angabe die Menge 1', () => {
  render(<CartItemCard name="Tasse" priceInCents={900} />);
  expect(screen.getByText('1 × 9,00 € = 9,00 €')).toBeInTheDocument();
});

it('blendet die Notiz in der kompakten Variante aus', () => {
  render(
    <CartItemCard
      name="Kaffeebohnen"
      priceInCents={1290}
      variant="compact"
      note="Frisch geröstet"
    />
  );
  expect(screen.queryByText('Frisch geröstet')).not.toBeInTheDocument();
});

it('markiert die hervorgehobene Variante', () => {
  render(
    <CartItemCard
      name="Kaffeebohnen"
      priceInCents={1290}
      variant="highlighted"
    />
  );
  expect(screen.getByRole('heading')).toHaveTextContent('★ Kaffeebohnen');
});
