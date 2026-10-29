import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { ProductResultList } from './organisms/ProductResultList';
import { ProductSearchPage } from './pages/ProductSearchPage';
import { ProductSearchTemplate } from './templates/ProductSearchTemplate';

it('ordnet die Slots des Templates an', () => {
  render(
    <ProductSearchTemplate
      title="Suche"
      searchField={<input aria-label="Feld" />}
      resultSummary="0 Treffer"
      results={<p>Ergebnisse</p>}
    />
  );
  expect(screen.getByRole('heading', { name: 'Suche' })).toBeVisible();
  expect(screen.getByLabelText('Feld')).toBeVisible();
  expect(screen.getByText('0 Treffer')).toBeVisible();
});

it('zeigt einen Hinweis bei leerer Trefferliste', () => {
  render(<ProductResultList products={[]} />);
  expect(screen.getByText('Keine Produkte gefunden')).toBeVisible();
});

it('filtert und zählt die Treffer auf der Page', async () => {
  render(<ProductSearchPage />);
  expect(screen.getByText('4 Treffer')).toBeVisible();
  await userEvent.type(screen.getByLabelText('Produkt suchen'), 'kaffee');
  expect(screen.getByText('2 Treffer')).toBeVisible();
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
});
