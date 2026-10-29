import { vi } from 'vitest';
import type { OrderApi } from './orders';
import { orders } from './shop';

// Bestellung o1001: 1 × Drehmomentschlüssel, Status „placed“.
export const testOrder = orders[0];

// Eine steuerbare API für Tests: Standardmäßig klappt alles.
export const createTestApi = () => ({
  fetchOrder: vi.fn<OrderApi['fetchOrder']>(() => Promise.resolve(testOrder)),
  fetchShipment: vi.fn<OrderApi['fetchShipment']>((orderId) =>
    Promise.resolve({ orderId, status: 'Unterwegs' })
  ),
});
