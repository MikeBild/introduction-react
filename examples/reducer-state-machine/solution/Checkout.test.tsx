import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { Checkout } from './Checkout';

it('starts a new order after success (solution)', async () => {
  render(<Checkout placeOrder={() => Promise.resolve('42')} />);
  await userEvent.click(screen.getByRole('button', { name: 'Order' }));
  await userEvent.click(
    await screen.findByRole('button', { name: 'New order' })
  );
  expect(screen.getByRole('button', { name: 'Order' })).toBeEnabled();
});
