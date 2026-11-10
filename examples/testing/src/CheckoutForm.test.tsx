import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { initialCart } from './cart';
import { CheckoutForm } from './CheckoutForm';

// Example: find elements the way users find them – by role and label.
it('shows customer, quantities and the button', () => {
  render(<CheckoutForm cart={initialCart} />);
  expect(screen.getByLabelText('Kunde')).toBeInTheDocument();
  expect(
    screen.getByRole('textbox', { name: 'Menge Drehmomentschlüssel' })
  ).toHaveValue('1');
  expect(screen.getByRole('button', { name: 'Bestellen' })).toBeEnabled();
});

// Exercise react-testing: write these three tests.
it.todo('shows the order number after a successful order');
it.todo('shows the validation error at the field and sends no request');
it.todo('reports a server error with status 500');
