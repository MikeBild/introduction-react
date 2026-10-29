import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { App } from './App';

it('zeigt alle Produkte mit Preis', () => {
  render(<App />);
  expect(screen.getAllByRole('listitem')).toHaveLength(4);
  expect(screen.getByText('49,00 €')).toBeInTheDocument();
});

it('filtert die Liste nach dem Suchtext', async () => {
  render(<App />);
  await userEvent.type(screen.getByLabelText('Suche'), 'kaffee');
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
  expect(screen.queryByText('Handmühle')).not.toBeInTheDocument();
});

it('zeigt einen Hinweis, wenn nichts passt', async () => {
  render(<App />);
  await userEvent.type(screen.getByLabelText('Suche'), 'Tee');
  expect(screen.getByText('Keine Produkte für „Tee“')).toBeInTheDocument();
});
