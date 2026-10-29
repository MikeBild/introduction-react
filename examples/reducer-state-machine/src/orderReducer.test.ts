import { describe, expect, it } from 'vitest';
import { orderReducer } from './orderReducer';
import {
  customerId,
  orderId,
  productId,
  type Order,
  type OrderStatus,
} from './shop';

const drill = { productId: productId('p1'), quantity: 1, priceCents: 8990 };

const orderWith = (status: OrderStatus, items = [drill]): Order => ({
  id: orderId('o1'),
  customerId: customerId('c1'),
  items,
  status,
  createdAt: '2026-10-29T10:00:00Z',
});

describe('orderReducer', () => {
  it('geht von draft nach placed', () => {
    expect(orderReducer(orderWith('draft'), { type: 'placed' }).status).toBe(
      'placed'
    );
  });

  it('nimmt im Entwurf neue Positionen auf', () => {
    const next = orderReducer(orderWith('draft', []), {
      type: 'itemAdded',
      item: drill,
    });
    expect(next.items).toEqual([drill]);
  });

  // Übung: .skip entfernen
  it.skip('ignoriert paid, solange die Bestellung ein Entwurf ist', () => {
    const draft = orderWith('draft');
    expect(orderReducer(draft, { type: 'paid' })).toBe(draft);
  });

  it.skip('platziert keine leere Bestellung', () => {
    const emptyDraft = orderWith('draft', []);
    expect(orderReducer(emptyDraft, { type: 'placed' })).toBe(emptyDraft);
  });

  it.skip('ändert ab placed keine Positionen mehr', () => {
    const placed = orderWith('placed');
    expect(orderReducer(placed, { type: 'itemAdded', item: drill })).toBe(
      placed
    );
  });

  it.skip('storniert nur aus draft oder placed', () => {
    const paid = orderWith('paid');
    expect(orderReducer(paid, { type: 'cancelled' })).toBe(paid);
    expect(
      orderReducer(orderWith('placed'), { type: 'cancelled' }).status
    ).toBe('cancelled');
  });
});
