import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { App } from './App';
import { mockFetchResponses, testProducts } from './test-utils';

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

// Übung: .skip entfernen, sobald fetch + use() + Suspense stehen
it.skip('meldet einen Server Error', async () => {
  mockFetchResponses({ status: 500, body: { message: 'Kaputt' } });
  await renderApp();
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Die Produkte konnten nicht geladen werden.'
  );
});

it.skip('meldet ungültige Daten vom Server', async () => {
  mockFetchResponses({ body: [{ id: 'p1', name: null, priceInCents: '12' }] });
  await renderApp();
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Die Produktdaten sind ungültig.'
  );
});

it.skip('lädt nach einem Fehler erneut', async () => {
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
