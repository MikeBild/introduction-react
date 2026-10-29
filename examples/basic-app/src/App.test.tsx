import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { App } from './App';

it('zeigt alle Produkte mit Preis', () => {
  render(<App />);
  expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(4);
  expect(screen.getByText('89,90 €')).toBeInTheDocument();
  expect(screen.getByText('Ausverkauft')).toBeInTheDocument();
});

// Übung react-state-hooks: .skip entfernen
it.skip('filtert die Liste nach dem Suchtext', async () => {
  render(<App />);
  await userEvent.type(screen.getByLabelText('Suche'), 'schlüssel');
  expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(2);
  expect(screen.queryByText('Werkstattwagen')).not.toBeInTheDocument();
});

it.skip('zeigt einen Hinweis, wenn nichts passt', async () => {
  render(<App />);
  await userEvent.type(screen.getByLabelText('Suche'), 'Bohrer');
  expect(
    screen.getByText(/^Keine Produkte für „Bohrer“\. Prüf die Schreibweise/)
  ).toBeInTheDocument();
});

it.skip('legt Produkte in den Warenkorb und summiert', async () => {
  render(<App />);
  await userEvent.click(
    screen.getByRole('button', { name: 'Drehmomentschlüssel in den Warenkorb' })
  );
  await userEvent.click(
    screen.getByRole('button', { name: 'Schraubendreher-Set in den Warenkorb' })
  );
  const cart = screen.getByRole('region', { name: 'Warenkorb' });
  expect(within(cart).getAllByRole('listitem')).toHaveLength(2);
  expect(within(cart).getByText('Summe: 109,80 €')).toBeInTheDocument();
});

it.skip('entfernt Positionen aus dem Warenkorb', async () => {
  render(<App />);
  await userEvent.click(
    screen.getByRole('button', { name: 'Werkstattwagen in den Warenkorb' })
  );
  await userEvent.click(
    screen.getByRole('button', { name: 'Werkstattwagen entfernen' })
  );
  const cart = screen.getByRole('region', { name: 'Warenkorb' });
  expect(within(cart).getByText('Summe: 0,00 €')).toBeInTheDocument();
});
