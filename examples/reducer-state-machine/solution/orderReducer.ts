import type { OrderAction } from '../src/orderReducer';
import type { Order, OrderStatus } from '../src/shop';

// Statusfolge: draft → placed → paid → shipped, cancelled nur aus draft oder placed.
const nextStatus: Record<
  'placed' | 'paid' | 'shipped' | 'cancelled',
  readonly OrderStatus[]
> = {
  placed: ['draft'],
  paid: ['placed'],
  shipped: ['paid'],
  cancelled: ['draft', 'placed'],
};

// Erlaubte Übergänge – alles andere behält den aktuellen State.
export const orderReducer = (state: Order, action: OrderAction): Order => {
  switch (action.type) {
    case 'itemAdded':
      return state.status === 'draft'
        ? { ...state, items: [...state.items, action.item] }
        : state;
    case 'itemRemoved':
      return state.status === 'draft'
        ? {
            ...state,
            items: state.items.filter(
              (item) => item.productId !== action.productId
            ),
          }
        : state;
    case 'placed':
      return state.status === 'draft' && state.items.length > 0
        ? { ...state, status: 'placed' }
        : state;
    case 'paid':
    case 'shipped':
    case 'cancelled':
      return nextStatus[action.type].includes(state.status)
        ? { ...state, status: action.type }
        : state;
  }
};
