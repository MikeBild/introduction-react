import { vi } from 'vitest';
import type { OrderApi } from './orders';
import { orders } from './shop';

// Order o1001: 1 × “Drehmomentschlüssel” (torque wrench), status “placed”.
export const testOrder = orders[0];

// A controllable API for tests: by default everything succeeds.
export const createTestApi = () => ({
  fetchOrder: vi.fn<OrderApi['fetchOrder']>(() => Promise.resolve(testOrder)),
  fetchShipment: vi.fn<OrderApi['fetchShipment']>((orderId) =>
    Promise.resolve({ orderId, status: 'Unterwegs' })
  ),
});
