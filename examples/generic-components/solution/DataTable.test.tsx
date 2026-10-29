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
  expect(screen.getAllByRole('row')).toHaveLength(3);
  expect(
    within(screen.getByRole('row', { name: /Ada Schmidt/ })).getByText(
      '109,80 €'
    )
  ).toBeInTheDocument();
});

it('funktioniert mit jedem Zeilentyp', () => {
  render(
    <DataTable
      rows={products}
      getRowKey={(product) => product.id}
      columns={[
        { field: 'name', header: 'Produkt' },
        {
          id: 'stock',
          header: 'Lager',
          render: (product) => (product.stock > 0 ? 'ja' : 'nein'),
        },
      ]}
    />
  );
  expect(
    screen.getByRole('row', { name: /Drehmomentschlüssel/ })
  ).toHaveTextContent('Drehmomentschlüsselja');
  expect(
    screen.getByRole('row', { name: /Steckschlüsselsatz/ })
  ).toHaveTextContent('Steckschlüsselsatznein');
});
