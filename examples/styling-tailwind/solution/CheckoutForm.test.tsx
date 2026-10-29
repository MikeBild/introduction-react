import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { CheckoutForm } from './CheckoutForm';

const renderForm = () => {
  const handlers = { onPay: vi.fn(), onBack: vi.fn(), onCancel: vi.fn() };
  const { container } = render(<CheckoutForm {...handlers} />);
  return { ...handlers, container };
};

it('bezahlt mit den eingegebenen Daten', async () => {
  const { onPay } = renderForm();
  await userEvent.type(screen.getByLabelText('Name'), 'Ada');
  await userEvent.type(screen.getByLabelText('IBAN'), 'DE00123');
  await userEvent.click(screen.getByRole('button', { name: 'Jetzt bezahlen' }));
  expect(onPay).toHaveBeenCalledOnce();
});

it('storniert über den Danger-Button', async () => {
  const { onCancel } = renderForm();
  await userEvent.click(
    screen.getByRole('button', { name: 'Bestellung stornieren' })
  );
  expect(onCancel).toHaveBeenCalledOnce();
});

it('nutzt keine globalen CSS-Klassen mehr', () => {
  const { container } = renderForm();
  expect(
    container.querySelector('.btn, .checkout-form, .field, .actions')
  ).toBeNull();
});

it('zeigt jede Variant mit eigenen Utilities', () => {
  renderForm();
  expect(screen.getByRole('button', { name: 'Jetzt bezahlen' })).toHaveClass(
    'bg-blue-600'
  );
  expect(
    screen.getByRole('button', { name: 'Zurück zum Warenkorb' })
  ).toHaveClass('border-slate-300');
  expect(
    screen.getByRole('button', { name: 'Bestellung stornieren' })
  ).toHaveClass('bg-red-600');
});
