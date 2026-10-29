import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { App } from './App';
import { mockFetchResponses, testProducts } from '../src/test-utils';

// Mit use() suspendiert die Component. React 19 verlangt dann ein awaited act().
const renderApp = () =>
  act(async () => {
    render(<App />);
  });

it('lädt die Produktliste', async () => {
  mockFetchResponses({ body: testProducts });
  await renderApp();
  expect(await screen.findByText(/Kaffeebohnen/)).toBeInTheDocument();
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
});

it('meldet einen Server Error', async () => {
  mockFetchResponses({ status: 500, body: { message: 'Kaputt' } });
  await renderApp();
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Die Produkte konnten nicht geladen werden.'
  );
});

it('meldet ungültige Daten vom Server', async () => {
  mockFetchResponses({ body: [{ id: 'p1', name: null, priceInCents: '12' }] });
  await renderApp();
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Die Produktdaten sind ungültig.'
  );
});

it('lädt nach einem Fehler erneut', async () => {
  mockFetchResponses({ status: 500, body: null }, { body: testProducts });
  await renderApp();
  await screen.findByRole('alert');
  await act(async () => {
    await userEvent.click(
      screen.getByRole('button', { name: 'Erneut versuchen' })
    );
  });
  expect(await screen.findByText(/Handmühle/)).toBeInTheDocument();
});

it('zeigt den Fallback, solange geladen wird', async () => {
  const { promise: responsePromise, resolve } =
    Promise.withResolvers<Response>();
  vi.spyOn(globalThis, 'fetch').mockReturnValue(responsePromise);
  await renderApp();
  expect(screen.getByText('Lädt …')).toBeInTheDocument();
  await act(async () => resolve(Response.json(testProducts)));
  expect(screen.getByText(/Kaffeebohnen/)).toBeInTheDocument();
  expect(screen.queryByText('Lädt …')).not.toBeInTheDocument();
});

it('lädt per Button neu', async () => {
  const fetchSpy = mockFetchResponses(
    { body: testProducts },
    { body: [...testProducts, { id: 'p3', name: 'Filter', priceInCents: 390 }] }
  );
  await renderApp();
  await screen.findByText(/Kaffeebohnen/);
  await act(async () => {
    await userEvent.click(screen.getByRole('button', { name: 'Neu laden' }));
  });
  expect(await screen.findByText(/Filter/)).toBeInTheDocument();
  expect(fetchSpy).toHaveBeenCalledTimes(2);
});
