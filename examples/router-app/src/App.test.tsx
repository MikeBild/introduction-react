import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { App } from './App';

// Opens the app at a URL – just like a shared link.
const openAt = (url: string) => {
  window.history.pushState(null, '', url);
  render(<App />);
};

it('shows the order overview', async () => {
  openAt('/orders');
  expect(await screen.findByText('Bestellung o1001')).toBeInTheDocument();
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
});

it('opens an order', async () => {
  openAt('/orders');
  await userEvent.click(await screen.findByText('Bestellung o1002'));
  expect(
    await screen.findByRole('heading', { name: 'Bestellung o1002' })
  ).toBeInTheDocument();
});

// Exercise: remove .skip
it.skip('reads the status filter from the URL', async () => {
  openAt('/orders?status=placed');
  expect(await screen.findByText('Bestellung o1001')).toBeInTheDocument();
  expect(screen.getAllByRole('listitem')).toHaveLength(1);
});

it.skip('writes the status filter to the URL', async () => {
  openAt('/orders');
  await screen.findByText('Bestellung o1001');
  await userEvent.selectOptions(screen.getByLabelText('Status'), 'shipped');
  await waitForElementToBeRemoved(() => screen.queryByText('Bestellung o1001'));
  expect(screen.getByText('Bestellung o1002')).toBeInTheDocument();
  expect(window.location.search).toBe('?status=shipped');
});

it.skip('opens an order via deep link', async () => {
  openAt('/orders/o1002');
  expect(
    await screen.findByRole('heading', { name: 'Bestellung o1002' })
  ).toBeInTheDocument();
  expect(screen.getByText('Summe: 288,80 €')).toBeInTheDocument();
});

it.skip('shows 404 for an unknown order', async () => {
  openAt('/orders/o9999');
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Das haben wir nicht gefunden.'
  );
  expect(
    screen.getByRole('link', { name: 'Zur Bestellübersicht' })
  ).toBeInTheDocument();
});
