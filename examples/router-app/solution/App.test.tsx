import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router';
import { expect, it } from 'vitest';
import { App, AppRoutes } from './App';
import { parseResourceId } from './resourceId';

const LocationDisplay = () => {
  const location = useLocation();
  return <output>{location.pathname + location.search}</output>;
};

const renderAt = (url: string) =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <AppRoutes />
      <LocationDisplay />
    </MemoryRouter>
  );

it('zeigt eine Ressource über den Path Param', () => {
  renderAt('/resources/2');
  expect(
    screen.getByRole('heading', { name: 'Raum Hamburg' })
  ).toBeInTheDocument();
});

it.each(['/resources/abc', '/resources/99', '/gibt-es-nicht'])(
  'zeigt für %s „Seite nicht gefunden“',
  (url) => {
    renderAt(url);
    expect(
      screen.getByRole('heading', { name: 'Seite nicht gefunden' })
    ).toBeInTheDocument();
  }
);

it('filtert über ?q= in der URL', () => {
  renderAt('/resources?q=ham');
  expect(screen.getByLabelText('Suche')).toHaveValue('ham');
  expect(screen.getAllByRole('listitem')).toHaveLength(1);
});

it('schreibt die Suche in die URL', async () => {
  renderAt('/resources');
  await userEvent.type(screen.getByLabelText('Suche'), 'beamer');
  expect(screen.getByRole('status')).toHaveTextContent('/resources?q=beamer');
});

it('navigiert über Links', async () => {
  renderAt('/');
  await userEvent.click(screen.getByRole('link', { name: 'Ressourcen' }));
  await userEvent.click(screen.getByRole('link', { name: 'Raum Hamburg' }));
  expect(screen.getByRole('status')).toHaveTextContent('/resources/2');
});

it('öffnet mit BrowserRouter einen Deep Link', () => {
  window.history.replaceState(null, '', '/resources/2');
  render(<App />);
  expect(
    screen.getByRole('heading', { name: 'Raum Hamburg' })
  ).toBeInTheDocument();
});

it('parst nur ganze Zahlen als ID', () => {
  expect(parseResourceId('3')).toBe(3);
  expect(parseResourceId('3a')).toBeNull();
  expect(parseResourceId(undefined)).toBeNull();
});
