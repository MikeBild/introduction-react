import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { AddToCartForm } from './AddToCartForm';

it('zeigt das Feld für die Menge', () => {
  render(<AddToCartForm stock={4} onAdd={() => {}} />);
  expect(screen.getByLabelText('Menge')).toHaveValue(1);
});

// Übung: .skip Schritt für Schritt entfernen
it.skip('deaktiviert den Button, wenn die Menge den Bestand übersteigt', async () => {
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

it.skip('deaktiviert den Button bei leerer Menge oder 0', async () => {
  render(<AddToCartForm stock={4} onAdd={() => {}} />);
  const quantity = screen.getByLabelText('Menge');
  const submitButton = screen.getByRole('button', { name: 'In den Warenkorb' });
  await userEvent.clear(quantity);
  expect(submitButton).toBeDisabled();
  await userEvent.type(quantity, '0');
  expect(submitButton).toBeDisabled();
});

it.skip('übergibt die Menge an onAdd', async () => {
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
