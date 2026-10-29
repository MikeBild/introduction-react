import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { App } from './App';
import { PriceTag } from './PriceTag';
import { ProductCard } from './ProductCard';

it('formatiert Cent-Beträge als Euro', () => {
  render(<PriceTag cents={1290} />);
  expect(screen.getByText('12,90 €')).toBeInTheDocument();
});

it('markiert ausverkaufte Produkte', () => {
  render(<ProductCard name="Hammer" priceCents={1290} stock={0} />);
  expect(screen.getByText('Ausverkauft')).toBeInTheDocument();
});

it('rendert die ganze Liste', () => {
  render(<App />);
  expect(screen.getAllByRole('listitem')).toHaveLength(4);
});
