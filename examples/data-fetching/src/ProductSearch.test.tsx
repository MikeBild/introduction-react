import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { App } from './App';
import { catalog, searchCatalog } from './catalog';
import { controlFetch } from './test-utils';

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

// Übung: .skip entfernen
it.skip('zeigt die Antwort für den letzten Suchtext, auch wenn eine alte später kommt', async () => {
  const api = controlFetch();
  render(<App />);
  typeSearch('boh');
  typeSearch('bohrer');
  await api.respond('bohrer', 200, searchCatalog('bohrer'));
  await api.respond('boh', 200, searchCatalog('boh'));
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
  expect(screen.queryByText(/Bohrhammer/)).not.toBeInTheDocument();
});

it.skip('bricht den alten Request ab', () => {
  const api = controlFetch();
  render(<App />);
  typeSearch('boh');
  typeSearch('bohrer');
  expect(api.findRequest('boh').signal?.aborted).toBe(true);
});

it.skip('zeigt HTTP-Fehler als Meldung', async () => {
  const api = controlFetch();
  render(<App />);
  await api.respond('', 500, { message: 'Interner Fehler' });
  expect(screen.getByRole('alert')).toHaveTextContent(
    'Der Server hat gerade ein Problem. Versuch es in einem Moment noch einmal.'
  );
});
