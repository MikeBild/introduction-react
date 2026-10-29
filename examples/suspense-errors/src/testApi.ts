import { vi } from 'vitest';
import type { Order, OrderApi } from './orders';

export const testOrder: Order = {
  id: 'o-1',
  customer: 'Ada Lovelace',
  totalInCents: 6190,
  items: [{ name: 'Kaffeebohnen', quantity: 2 }],
};

// Eine steuerbare API für Tests: Standardmäßig klappt alles.
export const createTestApi = () => ({
  fetchOrder: vi.fn<OrderApi['fetchOrder']>(() => Promise.resolve(testOrder)),
  fetchShipment: vi.fn<OrderApi['fetchShipment']>((orderId) =>
    Promise.resolve({ orderId, status: 'Unterwegs' })
  ),
});
