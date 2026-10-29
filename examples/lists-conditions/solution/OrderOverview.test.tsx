import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { OrderOverview } from './OrderOverview';
import { sampleOrders, type Order } from '../src/orders';

it('zeigt alle Bestellungen', () => {
  render(<OrderOverview state={{ status: 'success', orders: sampleOrders }} />);
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
  expect(screen.getByText(/Grace Hopper, 12,90 €/)).toBeInTheDocument();
});

it('zeigt einen Loading State', () => {
  render(<OrderOverview state={{ status: 'loading' }} />);
  expect(screen.getByRole('status')).toHaveTextContent(
    'Bestellungen werden geladen …'
  );
});

it('zeigt den Error State mit Meldung', () => {
  render(<OrderOverview state={{ status: 'error', message: 'Server down' }} />);
  expect(screen.getByRole('alert')).toHaveTextContent('Server down');
});

it('zeigt einen Empty State', () => {
  render(<OrderOverview state={{ status: 'success', orders: [] }} />);
  expect(screen.getByText('Noch keine Bestellungen')).toBeInTheDocument();
  expect(screen.queryByRole('list')).not.toBeInTheDocument();
});

it('behält den Haken bei der richtigen Bestellung, wenn oben eine neue dazukommt', async () => {
  const { rerender } = render(
    <OrderOverview state={{ status: 'success', orders: sampleOrders }} />
  );
  await userEvent.click(screen.getByLabelText('Bestellung 1001 geprüft'));

  const newOrder: Order = {
    id: 'o-1004',
    number: 1004,
    customerName: 'Margaret Hamilton',
    totalInCents: 990,
  };
  rerender(
    <OrderOverview
      state={{ status: 'success', orders: [newOrder, ...sampleOrders] }}
    />
  );

  expect(screen.getByLabelText('Bestellung 1001 geprüft')).toBeChecked();
  expect(screen.getByLabelText('Bestellung 1004 geprüft')).not.toBeChecked();
});
