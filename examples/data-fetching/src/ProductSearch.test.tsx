import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { App } from './App';
import { catalog, searchCatalog } from './catalog';
import { controlFetch } from './test-utils';

const typeSearch = (text: string) =>
  fireEvent.change(screen.getByLabelText('Produktsuche'), {
    target: { value: text },
  });

it('shows the products for the search text', async () => {
  const api = controlFetch();
  render(<App />);
  await api.respond('', 200, catalog);
  expect(screen.getAllByRole('listitem')).toHaveLength(catalog.length);
});

// Exercise: remove .skip
it.skip('shows the response for the latest search text, even if an older one arrives later', async () => {
  const api = controlFetch();
  render(<App />);
  typeSearch('boh');
  typeSearch('bohrer');
  await api.respond('bohrer', 200, searchCatalog('bohrer'));
  await api.respond('boh', 200, searchCatalog('boh'));
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
  expect(screen.queryByText(/Bohrhammer/)).not.toBeInTheDocument();
});

it.skip('aborts the old request', () => {
  const api = controlFetch();
  render(<App />);
  typeSearch('boh');
  typeSearch('bohrer');
  expect(api.findRequest('boh').signal?.aborted).toBe(true);
});

it.skip('shows HTTP errors as a message', async () => {
  const api = controlFetch();
  render(<App />);
  await api.respond('', 500, { message: 'Interner Fehler' });
  expect(screen.getByRole('alert')).toHaveTextContent(
    'Der Server hat gerade ein Problem. Versuch es in einem Moment noch einmal.'
  );
});
