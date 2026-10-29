import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { App } from './App';
import { CartBadge } from './CartBadge';

it('zählt hinzugefügte Artikel', async () => {
  render(<App />);
  await userEvent.click(
    screen.getByRole('button', { name: 'Werkstattwagen in den Warenkorb' })
  );
  expect(screen.getByText('Warenkorb: 1 Artikel')).toBeInTheDocument();
});

it('meldet einen fehlenden CartProvider mit klarer Fehlermeldung', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  expect(() => render(<CartBadge />)).toThrow(
    'useCart muss innerhalb von <CartProvider> aufgerufen werden'
  );
});
