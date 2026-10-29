import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { App } from './App';
import { catalog, searchCatalog } from '../src/catalog';
import { controlFetch } from '../src/test-utils';

const typeSearch = (text: string) =>
  fireEvent.change(screen.getByLabelText('Produktsuche'), {
    target: { value: text },
  });

it('zeigt die Produkte zum Suchtext', async () => {
  const api = controlFetch();
  render(<App />);
  await api.respond('', 200, catalog);
  expect(screen.getAllByRole('listitem')).toHaveLength(catalog.length);
});

it('zeigt die Antwort für den letzten Suchtext, auch wenn eine alte später kommt', async () => {
  const api = controlFetch();
  render(<App />);
  typeSearch('boh');
  typeSearch('bohrer');
  await api.respond('bohrer', 200, searchCatalog('bohrer'));
  await api.respond('boh', 200, searchCatalog('boh'));
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
  expect(screen.queryByText(/Bohrhammer/)).not.toBeInTheDocument();
});

it('bricht den alten Request ab', () => {
  const api = controlFetch();
  render(<App />);
  typeSearch('boh');
  typeSearch('bohrer');
  expect(api.findRequest('boh').signal?.aborted).toBe(true);
});

it('zeigt HTTP-Fehler als Meldung', async () => {
  const api = controlFetch();
  render(<App />);
  await api.respond('', 500, { message: 'Interner Fehler' });
  expect(screen.getByRole('alert')).toHaveTextContent('HTTP 500');
});

it('meldet eine unerwartete Antwort', async () => {
  const api = controlFetch();
  render(<App />);
  await api.respond('', 200, [{ id: 'p1' }]);
  expect(screen.getByRole('alert')).toHaveTextContent('Unerwartete Antwort');
});

it('zeigt einen Hinweis, wenn nichts passt', async () => {
  const api = controlFetch();
  render(<App />);
  typeSearch('zange');
  await api.respond('zange', 200, []);
  expect(screen.getByText('Keine Treffer für „zange“')).toBeInTheDocument();
});

it('bricht den Request beim Unmount ab', () => {
  const api = controlFetch();
  const { unmount } = render(<App />);
  unmount();
  expect(api.findRequest('').signal?.aborted).toBe(true);
});
