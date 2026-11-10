import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { initialCart } from './cart';
import { CheckoutForm } from './CheckoutForm';
import { placeOrder } from './placeOrder';
import { orderId } from './shop';

it('shows the missing customer at the field', async () => {
  const placeOrderSpy = vi.fn(() => Promise.resolve(orderId('o1')));
  render(<CheckoutForm cart={initialCart} placeOrder={placeOrderSpy} />);
  await userEvent.click(screen.getByRole('button', { name: 'Bestellen' }));
  expect(screen.getByLabelText('Kunde')).toHaveAccessibleDescription(
    'Bitte wähle einen Kunden'
  );
  expect(placeOrderSpy).not.toHaveBeenCalled();
});

// Exercise: remove .skip step by step
it.skip('shows an invalid quantity at the field', async () => {
  const placeOrderSpy = vi.fn(() => Promise.resolve(orderId('o1')));
  render(<CheckoutForm cart={initialCart} placeOrder={placeOrderSpy} />);
  await userEvent.selectOptions(screen.getByLabelText('Kunde'), 'Ada Schmidt');
  const quantity = screen.getByLabelText('Menge Drehmomentschlüssel');
  await userEvent.clear(quantity);
  await userEvent.type(quantity, '0');
  await userEvent.click(screen.getByRole('button', { name: 'Bestellen' }));
  expect(quantity).toHaveAccessibleDescription('Bitte eine ganze Zahl ab 1');
  expect(placeOrderSpy).not.toHaveBeenCalled();
});

it.skip('shows the server error at the item', async () => {
  render(<CheckoutForm cart={initialCart} placeOrder={placeOrder} />);
  await userEvent.selectOptions(screen.getByLabelText('Kunde'), 'Ada Schmidt');
  await userEvent.click(screen.getByRole('button', { name: 'Bestellen' }));
  expect(await screen.findByText('Nur 0 auf Lager')).toBeInTheDocument();
  expect(
    screen.getByLabelText('Menge Steckschlüsselsatz')
  ).toHaveAccessibleDescription('Nur 0 auf Lager');
});
