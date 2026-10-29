import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { expect, it } from 'vitest';
import { routes } from './routes';

const renderAt = (path: string) =>
  render(
    <RouterProvider
      router={createMemoryRouter(routes, { initialEntries: [path] })}
    />
  );

it('zeigt die Details zu einer Ressource', async () => {
  renderAt('/resources/2');
  expect(
    await screen.findByRole('heading', { name: 'Raum Hamburg' })
  ).toBeInTheDocument();
});

it('filtert die Ressourcen über das Suchfeld', async () => {
  renderAt('/resources');
  await userEvent.type(await screen.findByLabelText('Suche'), 'raum');
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
});

it('zeigt „Seite nicht gefunden“ für unbekannte Pfade', async () => {
  renderAt('/gibt-es-nicht');
  expect(
    await screen.findByRole('heading', { name: 'Seite nicht gefunden' })
  ).toBeInTheDocument();
});

// Übung: .skip entfernen – der Suchtext soll aus der URL kommen.
it.skip('liest den Suchtext aus dem Search Param ?q=', async () => {
  renderAt('/resources?q=beamer');
  expect(await screen.findByLabelText('Suche')).toHaveValue('beamer');
  expect(screen.getAllByRole('listitem')).toHaveLength(1);
});
