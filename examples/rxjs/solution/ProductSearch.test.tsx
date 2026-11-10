import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, it } from 'vitest';
import { App } from './App';
import { searchCatalog } from '../src/catalog';
import { controlFetch } from '../src/test-utils';

const typeSearch = (text: string) =>
  fireEvent.change(screen.getByLabelText('Produktsuche'), {
    target: { value: text },
  });

// Waits until the request for a search text goes out after the debounce.
const waitForRequest = (api: ReturnType<typeof controlFetch>, search: string) =>
  waitFor(() => expect(() => api.findRequest(search)).not.toThrow());

it('searches only once you stop typing for a moment', async () => {
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

it('cancels the old search when a new search text arrives', async () => {
  const api = controlFetch();
  render(<App />);
  typeSearch('boh');
  await waitForRequest(api, 'boh');
  typeSearch('bohrer');
  await waitForRequest(api, 'bohrer');
  expect(api.findRequest('boh').signal?.aborted).toBe(true);
});

it('shows the results of the latest search, even if an old one arrives later', async () => {
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

it('keeps searching after a server error', async () => {
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
