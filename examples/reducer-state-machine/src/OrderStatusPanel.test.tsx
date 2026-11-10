import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { OrderStatusPanel } from './OrderStatusPanel';

const clickButton = (name: string) =>
  userEvent.click(screen.getByRole('button', { name }));

it('starts as an empty draft', () => {
  render(<OrderStatusPanel />);
  expect(screen.getByRole('status')).toHaveTextContent('draft');
});

// Exercise: remove .skip once the Reducer ignores forbidden transitions
it.skip('no longer cancels after shipping', async () => {
  render(<OrderStatusPanel />);
  await clickButton('Schraubendreher-Set hinzufügen');
  await clickButton('Bestellen');
  await clickButton('Bezahlen');
  await clickButton('Versenden');
  await clickButton('Stornieren');
  expect(screen.getByRole('status')).toHaveTextContent('shipped');
});
