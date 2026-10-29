import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { initialCart } from '../src/cart';
import { CheckoutForm } from '../src/CheckoutForm';
import { mockFetchResponse } from '../src/test/mockFetchResponse';

it('zeigt die Bestellnummer nach erfolgreicher Bestellung', async () => {
  // Arrange
  const user = userEvent.setup();
  const fetchMock = mockFetchResponse(201, { id: 'o1004' });
  render(<CheckoutForm cart={initialCart} />);

  // Act
  await user.selectOptions(screen.getByLabelText('Kunde'), 'Ada Schmidt');
  await user.click(screen.getByRole('button', { name: 'Bestellen' }));

  // Assert
  expect(await screen.findByRole('status')).toHaveTextContent(
    'Bestellung o1004 ist eingegangen'
  );
  expect(fetchMock).toHaveBeenCalledWith(
    '/api/orders',
    expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({
        customerId: 'c1',
        items: [
          { productId: 'p1', quantity: 1 },
          { productId: 'p4', quantity: 2 },
        ],
      }),
    })
  );
});

it('zeigt den Validation Error am Feld und sendet keinen Request', async () => {
  const user = userEvent.setup();
  const fetchMock = mockFetchResponse(201, { id: 'o1004' });
  render(<CheckoutForm cart={initialCart} />);

  await user.selectOptions(screen.getByLabelText('Kunde'), 'Ada Schmidt');
  const quantity = screen.getByRole('textbox', {
    name: 'Menge Drehmomentschlüssel',
  });
  await user.clear(quantity);
  await user.type(quantity, '0');
  await user.click(screen.getByRole('button', { name: 'Bestellen' }));

  expect(quantity).toHaveAccessibleDescription('Bitte eine ganze Zahl ab 1');
  expect(fetchMock).not.toHaveBeenCalled();
});

it('meldet einen Server Error mit Status 500', async () => {
  const user = userEvent.setup();
  mockFetchResponse(500, null);
  render(<CheckoutForm cart={initialCart} />);

  await user.selectOptions(screen.getByLabelText('Kunde'), 'Ada Schmidt');
  await user.click(screen.getByRole('button', { name: 'Bestellen' }));

  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Die Bestellung ist fehlgeschlagen. Der Server hat gerade ein Problem.'
  );
  expect(screen.getByRole('button', { name: 'Bestellen' })).toBeEnabled();
});

it('zeigt einen Bestandsfehler vom Server an der Position', async () => {
  const user = userEvent.setup();
  mockFetchResponse(409, {
    path: 'items.1.quantity',
    message: 'Nur 1 auf Lager',
  });
  render(<CheckoutForm cart={initialCart} />);

  await user.selectOptions(screen.getByLabelText('Kunde'), 'Ada Schmidt');
  await user.click(screen.getByRole('button', { name: 'Bestellen' }));

  expect(await screen.findByText('Nur 1 auf Lager')).toBeInTheDocument();
  expect(
    screen.getByRole('textbox', { name: 'Menge Schraubendreher-Set' })
  ).toHaveAccessibleDescription('Nur 1 auf Lager');
});
