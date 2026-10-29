import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { Cart } from './Cart';
import { mergeItem } from './cartApi';
import { productId, type OrderItem } from './shop';

const addToCart = async (productName: string, quantity: string) => {
  await userEvent.selectOptions(screen.getByLabelText('Produkt'), productName);
  const quantityField = screen.getByLabelText('Menge');
  await userEvent.clear(quantityField);
  await userEvent.type(quantityField, quantity);
  await userEvent.click(
    screen.getByRole('button', { name: 'In den Warenkorb' })
  );
};

it('lehnt Menge 0 ab, ohne den Server zu fragen', async () => {
  render(<Cart addItemToDraft={() => Promise.reject('unerwarteter Aufruf')} />);
  await addToCart('Drehmomentschlüssel', '0');
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Bitte Produkt und Menge ab 1 wählen'
  );
});

it('zeigt die Position, nachdem der Server sie gespeichert hat', async () => {
  render(<Cart addItemToDraft={(_orderId, item) => Promise.resolve([item])} />);
  await addToCart('Drehmomentschlüssel', '2');
  expect(await screen.findByRole('listitem')).toHaveTextContent(
    '2 × Drehmomentschlüssel'
  );
  expect(screen.getByText('Summe: 179,80 €')).toBeInTheDocument();
});

// Übung: .skip entfernen
it.skip('zeigt die Position sofort, während der Server noch speichert', async () => {
  const { promise: savedItems, resolve: resolveSavedItems } =
    Promise.withResolvers<OrderItem[]>();
  render(<Cart addItemToDraft={() => savedItems} />);
  await addToCart('Drehmomentschlüssel', '1');
  expect(await screen.findByRole('listitem')).toHaveTextContent(
    '1 × Drehmomentschlüssel'
  );
  expect(screen.getByRole('button', { name: 'Speichere …' })).toBeDisabled();
  resolveSavedItems([]);
});

it.skip('entfernt die optimistische Position, wenn der Bestand nicht reicht', async () => {
  render(
    <Cart
      addItemToDraft={() =>
        Promise.reject(new Error('Nicht genug Bestand für Steckschlüsselsatz'))
      }
    />
  );
  await addToCart('Steckschlüsselsatz', '1');
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Nicht genug Bestand für Steckschlüsselsatz'
  );
  expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
});

it('fasst gleiche Produkte zu einer Position zusammen', () => {
  const item = { productId: productId('p1'), quantity: 1, priceCents: 8990 };
  expect(mergeItem([item], item)).toEqual([{ ...item, quantity: 2 }]);
});
