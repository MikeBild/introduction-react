import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { App } from './App';

// Öffnet die App unter einer URL – so wie ein geteilter Link.
const openAt = (url: string) => {
  window.history.pushState(null, '', url);
  render(<App />);
};

it('zeigt die Bestellübersicht', async () => {
  openAt('/orders');
  expect(await screen.findByText('Bestellung o1001')).toBeInTheDocument();
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
});

it('öffnet eine Bestellung', async () => {
  openAt('/orders');
  await userEvent.click(await screen.findByText('Bestellung o1002'));
  expect(
    await screen.findByRole('heading', { name: 'Bestellung o1002' })
  ).toBeInTheDocument();
});

// Übung: .skip entfernen
it.skip('liest den Statusfilter aus der URL', async () => {
  openAt('/orders?status=placed');
  expect(await screen.findByText('Bestellung o1001')).toBeInTheDocument();
  expect(screen.getAllByRole('listitem')).toHaveLength(1);
});

it.skip('schreibt den Statusfilter in die URL', async () => {
  openAt('/orders');
  await screen.findByText('Bestellung o1001');
  await userEvent.selectOptions(screen.getByLabelText('Status'), 'shipped');
  await waitForElementToBeRemoved(() => screen.queryByText('Bestellung o1001'));
  expect(screen.getByText('Bestellung o1002')).toBeInTheDocument();
  expect(window.location.search).toBe('?status=shipped');
});

it.skip('öffnet eine Bestellung per Deep Link', async () => {
  openAt('/orders/o1002');
  expect(
    await screen.findByRole('heading', { name: 'Bestellung o1002' })
  ).toBeInTheDocument();
  expect(screen.getByText('Summe: 288,80 €')).toBeInTheDocument();
});

it.skip('zeigt für eine unbekannte Bestellung 404', async () => {
  openAt('/orders/o9999');
  expect(await screen.findByRole('alert')).toHaveTextContent('404 Not Found');
  expect(
    screen.getByRole('link', { name: 'Zur Bestellübersicht' })
  ).toBeInTheDocument();
});
