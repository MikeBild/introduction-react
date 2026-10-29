import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { CheckoutForm } from './CheckoutForm';
import { orders } from '../src/shop';

const renderForm = () => {
  const handlers = { onPay: vi.fn(), onBack: vi.fn(), onCancel: vi.fn() };
  const { container } = render(
    <CheckoutForm items={orders[1]?.items ?? []} {...handlers} />
  );
  return { ...handlers, container };
};

it('bezahlt mit den eingegebenen Daten', async () => {
  const { onPay } = renderForm();
  await userEvent.type(screen.getByLabelText('Name'), 'Ada');
  await userEvent.type(screen.getByLabelText('IBAN'), 'DE00123');
  await userEvent.click(screen.getByRole('button', { name: 'Jetzt bezahlen' }));
  expect(onPay).toHaveBeenCalledOnce();
});

it('zeigt Positionen und Summe in Cent gerechnet', () => {
  renderForm();
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
  expect(screen.getByText('Summe 288,80 €')).toBeInTheDocument();
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
    container.querySelector(
      '.btn, .checkout-form, .field, .actions, .order-summary, .total'
    )
  ).toBeNull();
});

it('zeigt jede Variant mit eigenen Utilities', () => {
  renderForm();
  expect(screen.getByRole('button', { name: 'Jetzt bezahlen' })).toHaveClass(
    'bg-blue-700'
  );
  expect(
    screen.getByRole('button', { name: 'Zurück zum Warenkorb' })
  ).toHaveClass('border-slate-300');
  expect(
    screen.getByRole('button', { name: 'Bestellung stornieren' })
  ).toHaveClass('bg-red-700');
});
