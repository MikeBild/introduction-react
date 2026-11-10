import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { AddToCartForm } from './AddToCartForm';

it('shows the quantity field', () => {
  render(<AddToCartForm stock={4} onAdd={() => {}} />);
  expect(screen.getByLabelText('Menge')).toHaveValue(1);
});

it('disables the button when the quantity exceeds the stock', async () => {
  render(<AddToCartForm stock={4} onAdd={() => {}} />);
  const quantity = screen.getByLabelText('Menge');
  const submitButton = screen.getByRole('button', { name: 'In den Warenkorb' });
  await userEvent.clear(quantity);
  await userEvent.type(quantity, '5');
  expect(submitButton).toBeDisabled();
  await userEvent.clear(quantity);
  await userEvent.type(quantity, '4');
  expect(submitButton).toBeEnabled();
});

it('disables the button for an empty quantity or 0', async () => {
  render(<AddToCartForm stock={4} onAdd={() => {}} />);
  const quantity = screen.getByLabelText('Menge');
  const submitButton = screen.getByRole('button', { name: 'In den Warenkorb' });
  await userEvent.clear(quantity);
  expect(submitButton).toBeDisabled();
  await userEvent.type(quantity, '0');
  expect(submitButton).toBeDisabled();
});

it('passes the quantity to onAdd', async () => {
  const onAdd = vi.fn();
  render(<AddToCartForm stock={4} onAdd={onAdd} />);
  const quantity = screen.getByLabelText('Menge');
  await userEvent.clear(quantity);
  await userEvent.type(quantity, '3');
  await userEvent.click(
    screen.getByRole('button', { name: 'In den Warenkorb' })
  );
  expect(onAdd).toHaveBeenCalledWith(3);
});

it('resets the quantity to 1 after submitting', async () => {
  render(<AddToCartForm stock={4} onAdd={() => {}} />);
  const quantity = screen.getByLabelText('Menge');
  await userEvent.clear(quantity);
  await userEvent.type(quantity, '2');
  await userEvent.click(
    screen.getByRole('button', { name: 'In den Warenkorb' })
  );
  expect(quantity).toHaveValue(1);
});
