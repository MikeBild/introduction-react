import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { App } from './App';
import { PriceTag } from './PriceTag';
import { ProductCard } from './ProductCard';

it('formatiert Cent-Beträge als Euro', () => {
  render(<PriceTag amountInCents={390} />);
  expect(screen.getByText('3,90 €')).toBeInTheDocument();
});

it('markiert ausverkaufte Produkte', () => {
  render(
    <ProductCard
      product={{ id: 'x', name: 'Tasse', priceInCents: 900, isInStock: false }}
    />
  );
  expect(screen.getByText('ausverkauft')).toBeInTheDocument();
});

it('rendert die ganze Liste', () => {
  render(<App />);
  expect(screen.getAllByRole('listitem')).toHaveLength(4);
});
