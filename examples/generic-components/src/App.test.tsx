import { render, screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import { App } from './App';

// Bleibt grün, wenn du CustomerTable durch DataTable<Customer> ersetzt.
it('zeigt die Kundenliste als Tabelle', () => {
  render(<App />);
  expect(
    screen.getAllByRole('columnheader').map((header) => header.textContent)
  ).toEqual(['Name', 'E-Mail', 'Umsatz']);
  expect(screen.getAllByRole('row')).toHaveLength(3);
  expect(
    within(screen.getByRole('row', { name: /Ada Schmidt/ })).getByText(
      '109,80 €'
    )
  ).toBeInTheDocument();
});
