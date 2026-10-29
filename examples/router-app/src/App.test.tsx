import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { App } from './App';

it('navigiert von der Startseite zu einer Ressource', async () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Start' })).toBeInTheDocument();
  await userEvent.click(screen.getByText('Ressourcen'));
  await userEvent.click(screen.getByText('Raum Hamburg'));
  expect(
    screen.getByRole('heading', { name: 'Raum Hamburg' })
  ).toBeInTheDocument();
});

it('filtert die Ressourcen nach dem Suchtext', async () => {
  render(<App />);
  await userEvent.click(screen.getByText('Ressourcen'));
  await userEvent.type(screen.getByLabelText('Suche'), 'raum');
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
});

// Übung: .skip entfernen. Die Tests setzen die Adresse wie ein Deep Link.
it.skip('öffnet eine Ressource per Deep Link', () => {
  window.history.replaceState(null, '', '/resources/2');
  render(<App />);
  expect(
    screen.getByRole('heading', { name: 'Raum Hamburg' })
  ).toBeInTheDocument();
});

it.skip('liest die Suche aus ?q= in der URL', () => {
  window.history.replaceState(null, '', '/resources?q=ham');
  render(<App />);
  expect(screen.getByLabelText('Suche')).toHaveValue('ham');
  expect(screen.getAllByRole('listitem')).toHaveLength(1);
});

it.skip('schreibt die Suche in die URL', async () => {
  window.history.replaceState(null, '', '/resources');
  render(<App />);
  await userEvent.type(screen.getByLabelText('Suche'), 'beamer');
  expect(window.location.search).toBe('?q=beamer');
});

it.skip('zeigt für unbekannte Adressen „Seite nicht gefunden“', () => {
  window.history.replaceState(null, '', '/gibt-es-nicht');
  render(<App />);
  expect(
    screen.getByRole('heading', { name: 'Seite nicht gefunden' })
  ).toBeInTheDocument();
});
