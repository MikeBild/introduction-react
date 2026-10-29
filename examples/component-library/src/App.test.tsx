import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { App } from './App';

it('zeigt alle Kunden', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /Ada Lovelace/ })
  ).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: 'Bearbeiten' })).toHaveLength(3);
});

it('filtert Produkte über das Suchfeld', async () => {
  render(<App />);
  await userEvent.type(screen.getByLabelText('Produkt suchen'), 'kaffee');
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
});

// Übung react-composition: .skip entfernen
it.skip('zeigt jeden Kunden als article mit Überschrift', () => {
  render(<App />);
  expect(screen.getAllByRole('article')).toHaveLength(3);
});

// Übung react-atomic-design: .skip entfernen
it.skip('zeigt im Template der Produktsuche die Anzahl der Treffer', async () => {
  render(<App />);
  await userEvent.type(screen.getByLabelText('Produkt suchen'), 'kaffee');
  expect(screen.getByText('2 Treffer')).toBeInTheDocument();
});
