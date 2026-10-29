import { createMemoryHistory, RouterProvider } from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { createAppRouter } from './router';

const renderAt = (path: string) => {
  const router = createAppRouter(
    createMemoryHistory({ initialEntries: [path] })
  );
  render(<RouterProvider router={router} />);
  return router;
};

it('zeigt die Details zum typisierten Path Param', async () => {
  renderAt('/resources/2');
  expect(
    await screen.findByRole('heading', { name: 'Raum Hamburg' })
  ).toBeInTheDocument();
});

it('zeigt NotFound für eine ungültige oder unbekannte ID', async () => {
  renderAt('/resources/abc');
  expect(
    await screen.findByRole('heading', { name: 'Seite nicht gefunden' })
  ).toBeInTheDocument();
});

it('liest den Suchtext aus dem Search Param ?q=', async () => {
  renderAt('/resources?q=beamer');
  expect(await screen.findByLabelText('Suche')).toHaveValue('beamer');
  expect(screen.getAllByRole('listitem')).toHaveLength(1);
});

it('schreibt die Eingabe in die URL', async () => {
  const router = renderAt('/resources');
  await userEvent.type(await screen.findByLabelText('Suche'), 'raum');
  expect(router.state.location.search).toEqual({ q: 'raum' });
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
});

it('zeigt NotFound für unbekannte Pfade', async () => {
  renderAt('/gibt-es-nicht');
  expect(
    await screen.findByRole('heading', { name: 'Seite nicht gefunden' })
  ).toBeInTheDocument();
});
