import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { OrderStatusPanel } from './OrderStatusPanel';

const clickButton = (name: string) =>
  userEvent.click(screen.getByRole('button', { name }));

it('bestellt eine leere Bestellung nicht', async () => {
  render(<OrderStatusPanel />);
  await clickButton('Bestellen');
  expect(screen.getByRole('status')).toHaveTextContent('draft');
});

it('storniert nach dem Versand nicht mehr', async () => {
  render(<OrderStatusPanel />);
  await clickButton('Schraubendreher-Set hinzufügen');
  await clickButton('Bestellen');
  await clickButton('Bezahlen');
  await clickButton('Versenden');
  await clickButton('Stornieren');
  expect(screen.getByRole('status')).toHaveTextContent('shipped');
});
