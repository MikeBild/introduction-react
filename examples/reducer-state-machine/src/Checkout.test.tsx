import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { Checkout } from './Checkout';

it('shows the order id after a successful order', async () => {
  render(<Checkout placeOrder={() => Promise.resolve('42')} />);
  await userEvent.click(screen.getByRole('button', { name: 'Order' }));
  expect(await screen.findByText('Order 42 placed')).toBeInTheDocument();
});

it('shows the error and allows a retry', async () => {
  render(<Checkout placeOrder={() => Promise.reject('Payment declined')} />);
  await userEvent.click(screen.getByRole('button', { name: 'Order' }));
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Payment declined'
  );
  expect(screen.getByRole('button', { name: 'Order' })).toBeEnabled();
});
