import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { ProductResultList } from './organisms/ProductResultList';
import { ProductSearchPage } from './pages/ProductSearchPage';
import { ProductSearchTemplate } from './templates/ProductSearchTemplate';

it('arranges the slots of the template', () => {
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

it('shows a hint when the result list is empty', () => {
  render(<ProductResultList products={[]} />);
  expect(screen.getByText(/^Keine Produkte gefunden\./)).toBeVisible();
});

it('filters and counts the results on the page', async () => {
  render(<ProductSearchPage />);
  expect(screen.getByText('4 Treffer')).toBeVisible();
  await userEvent.type(screen.getByLabelText('Produkt suchen'), 'schlüssel');
  expect(screen.getByText('2 Treffer')).toBeVisible();
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
});
