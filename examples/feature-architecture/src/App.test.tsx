import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { App } from './App';

it('adds a product to the cart', async () => {
  render(<App />);
  await userEvent.click(
    screen.getByRole('button', { name: 'Add Grinder to cart' })
  );
  expect(screen.getByText(/1 items, total €49.00/)).toBeInTheDocument();
});
