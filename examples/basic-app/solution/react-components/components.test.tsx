import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { App } from './App';
import { PriceTag } from './PriceTag';
import { ProductCard } from './ProductCard';

it('formats cent amounts as euros', () => {
  render(<PriceTag cents={1290} />);
  expect(screen.getByText('12,90 €')).toBeInTheDocument();
});

it('marks sold-out products', () => {
  render(<ProductCard name="Hammer" priceCents={1290} stock={0} />);
  expect(screen.getByText('Ausverkauft')).toBeInTheDocument();
});

it('renders the whole list', () => {
  render(<App />);
  expect(screen.getAllByRole('listitem')).toHaveLength(4);
});
