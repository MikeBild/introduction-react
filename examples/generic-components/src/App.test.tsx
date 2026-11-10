import { render, screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import { App } from './App';

// Stays green when you replace CustomerTable with DataTable<Customer>.
it('shows the customer list as a table', () => {
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
