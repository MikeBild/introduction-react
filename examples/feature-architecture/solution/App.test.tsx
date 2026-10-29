import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { App } from './App';

it('legt ein Produkt in den Warenkorb', async () => {
  render(<App />);
  await userEvent.click(
    screen.getByRole('button', { name: 'Werkstattwagen in den Warenkorb' })
  );
  expect(screen.getByText(/1 Positionen, Summe 249,00\s€/)).toBeInTheDocument();
});
