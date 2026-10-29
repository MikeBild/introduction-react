import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { Checkout } from './Checkout';
import { orderId } from '../src/shop';

it('startet nach Erfolg eine neue Bestellung', async () => {
  render(<Checkout placeOrder={() => Promise.resolve(orderId('o42'))} />);
  await userEvent.click(screen.getByRole('button', { name: 'Bestellen' }));
  await userEvent.click(
    await screen.findByRole('button', { name: 'Neue Bestellung' })
  );
  expect(screen.getByRole('button', { name: 'Bestellen' })).toBeEnabled();
});
