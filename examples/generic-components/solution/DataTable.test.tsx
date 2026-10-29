import { render, screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import { products } from '../src/data';
import { App } from './App';
import { DataTable } from './DataTable';

it('zeigt die Kundenliste als Tabelle', () => {
  render(<App />);
  expect(
    screen.getAllByRole('columnheader').map((header) => header.textContent)
  ).toEqual(['Name', 'E-Mail', 'Umsatz']);
  expect(screen.getAllByRole('row')).toHaveLength(4);
  expect(
    within(screen.getByRole('row', { name: /Ada Lovelace/ })).getByText(
      '1.290,00 €'
    )
  ).toBeInTheDocument();
});

it('funktioniert mit jedem Zeilentyp', () => {
  render(
    <DataTable
      rows={products}
      getRowKey={(product) => product.sku}
      columns={[
        { field: 'title', header: 'Produkt' },
        {
          id: 'stock',
          header: 'Lager',
          render: (product) => (product.isInStock ? 'ja' : 'nein'),
        },
      ]}
    />
  );
  expect(screen.getByRole('row', { name: /Kaffeebohnen/ })).toHaveTextContent(
    'Kaffeebohnenja'
  );
  expect(screen.getByRole('row', { name: /Handmühle/ })).toHaveTextContent(
    'Handmühlenein'
  );
});
