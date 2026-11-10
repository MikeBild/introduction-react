import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { OrderOverview } from './OrderOverview';
import { orderId, orders as sampleOrders, type Order } from '../src/shop';

it('shows all orders', () => {
  render(<OrderOverview state={{ status: 'success', orders: sampleOrders }} />);
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
  expect(screen.getByText(/Tom Weber, Versandt, 288,80 €/)).toBeInTheDocument();
});

it('shows a loading state', () => {
  render(<OrderOverview state={{ status: 'loading' }} />);
  expect(screen.getByRole('status')).toHaveTextContent(
    'Bestellungen werden geladen …'
  );
});

it('shows the error state with a message', () => {
  render(<OrderOverview state={{ status: 'error', message: 'Server down' }} />);
  expect(screen.getByRole('alert')).toHaveTextContent(
    'Bestellungen nicht verfügbar (Server down). Lade die Seite neu'
  );
});

it('shows an empty state', () => {
  render(<OrderOverview state={{ status: 'success', orders: [] }} />);
  expect(screen.getByText(/^Noch keine Bestellungen\./)).toBeInTheDocument();
  expect(screen.queryByRole('list')).not.toBeInTheDocument();
});

it('keeps the checkmark on the right order when a new one is added at the top', async () => {
  const { rerender } = render(
    <OrderOverview state={{ status: 'success', orders: sampleOrders }} />
  );
  await userEvent.click(screen.getByLabelText('Bestellung o1001 geprüft'));

  const newOrder: Order = {
    ...sampleOrders[0],
    id: orderId('o1004'),
    status: 'draft',
  };
  rerender(
    <OrderOverview
      state={{ status: 'success', orders: [newOrder, ...sampleOrders] }}
    />
  );

  expect(screen.getByLabelText('Bestellung o1001 geprüft')).toBeChecked();
  expect(screen.getByLabelText('Bestellung o1004 geprüft')).not.toBeChecked();
});
