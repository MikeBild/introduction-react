import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, it } from 'vitest';
import { App } from './App';
import { searchCatalog } from '../src/catalog';
import { controlFetch } from '../src/test-utils';

const typeSearch = (text: string) =>
  fireEvent.change(screen.getByLabelText('Produktsuche'), {
    target: { value: text },
  });

// Wartet, bis der Request für einen Suchtext nach dem Debounce rausgeht.
const waitForRequest = (api: ReturnType<typeof controlFetch>, search: string) =>
  waitFor(() => expect(() => api.findRequest(search)).not.toThrow());

it('sucht erst, wenn du kurz nicht tippst', async () => {
  const api = controlFetch();
  render(<App />);
  typeSearch('h');
  typeSearch('ha');
  typeSearch('hammer');
  await waitForRequest(api, 'hammer');
  expect(api.fetchSpy).toHaveBeenCalledTimes(1);
  await api.respond('hammer', 200, searchCatalog('hammer'));
  expect(await screen.findAllByRole('listitem')).toHaveLength(3);
});

it('kündigt die alte Suche, wenn ein neuer Suchtext kommt', async () => {
  const api = controlFetch();
  render(<App />);
  typeSearch('boh');
  await waitForRequest(api, 'boh');
  typeSearch('bohrer');
  await waitForRequest(api, 'bohrer');
  expect(api.findRequest('boh').signal?.aborted).toBe(true);
});

it('zeigt die Treffer der letzten Suche, auch wenn eine alte später kommt', async () => {
  const api = controlFetch();
  render(<App />);
  typeSearch('boh');
  await waitForRequest(api, 'boh');
  typeSearch('bohrer');
  await waitForRequest(api, 'bohrer');
  await api.respond('bohrer', 200, searchCatalog('bohrer'));
  await api.respond('boh', 200, searchCatalog('boh'));
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
  expect(screen.queryByText(/Bohrhammer/)).not.toBeInTheDocument();
});

it('sucht nach einem Server-Fehler weiter', async () => {
  const api = controlFetch();
  render(<App />);
  typeSearch('hammer');
  await waitForRequest(api, 'hammer');
  await api.respond('hammer', 500, { message: 'Interner Fehler' });
  expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  typeSearch('bohrer');
  await waitForRequest(api, 'bohrer');
  await api.respond('bohrer', 200, searchCatalog('bohrer'));
  expect(await screen.findAllByRole('listitem')).toHaveLength(2);
});
