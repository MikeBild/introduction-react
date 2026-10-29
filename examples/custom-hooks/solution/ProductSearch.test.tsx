import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { ProductSearch } from './ProductSearch';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

const resultNames = () =>
  within(screen.getByRole('list', { name: 'Treffer' }))
    .queryAllByRole('listitem')
    .map((item) => item.textContent);

it('filtert erst nach der Pause', () => {
  render(<ProductSearch delayMs={300} />);
  fireEvent.change(screen.getByLabelText('Produkt suchen'), {
    target: { value: 'kaffee' },
  });
  expect(resultNames()).toHaveLength(5);
  act(() => vi.advanceTimersByTime(300));
  expect(resultNames()).toEqual(['Kaffeebohnen', 'Kaffeefilter']);
});
