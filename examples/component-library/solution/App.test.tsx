import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { App } from './App';

it('zeigt jeden Kunden als article mit Überschrift', () => {
  render(<App />);
  expect(screen.getAllByRole('article')).toHaveLength(3);
  expect(
    screen.getByRole('heading', { name: /Ada Lovelace/ })
  ).toBeInTheDocument();
});

it('zeigt im Template der Produktsuche die Anzahl der Treffer', async () => {
  render(<App />);
  await userEvent.type(screen.getByLabelText('Produkt suchen'), 'kaffee');
  expect(screen.getByText('2 Treffer')).toBeInTheDocument();
});
