import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { Checkout } from './Checkout';
import { orderId } from './shop';

it('shows the order number after success', async () => {
  render(<Checkout placeOrder={() => Promise.resolve(orderId('o42'))} />);
  await userEvent.click(screen.getByRole('button', { name: 'Bestellen' }));
  expect(
    await screen.findByText('Bestellung o42 ist eingegangen')
  ).toBeInTheDocument();
});

it('shows the error and allows a new attempt', async () => {
  render(
    <Checkout
      placeOrder={() => Promise.reject(new Error('Zahlung abgelehnt'))}
    />
  );
  await userEvent.click(screen.getByRole('button', { name: 'Bestellen' }));
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Zahlung abgelehnt. Versuch es noch einmal.'
  );
  expect(screen.getByRole('button', { name: 'Bestellen' })).toBeEnabled();
});
