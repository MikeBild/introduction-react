import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { App } from './App';
import { CartBadge } from './CartBadge';

it('counts added items', async () => {
  render(<App />);
  await userEvent.click(
    screen.getByRole('button', { name: 'Werkstattwagen in den Warenkorb' })
  );
  expect(screen.getByText('Warenkorb: 1 Artikel')).toBeInTheDocument();
});

it('reports a missing CartProvider with a clear error message', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  expect(() => render(<CartBadge />)).toThrow(
    'useCart muss innerhalb von <CartProvider> aufgerufen werden'
  );
});
