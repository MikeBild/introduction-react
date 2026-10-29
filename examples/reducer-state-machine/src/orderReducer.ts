import type { Order, OrderItem, ProductId } from './shop';

export type OrderAction =
  | { type: 'itemAdded'; item: OrderItem }
  | { type: 'itemRemoved'; productId: ProductId }
  | { type: 'placed' }
  | { type: 'paid' }
  | { type: 'shipped' }
  | { type: 'cancelled' };

// Übung react-reducer: Dieser Reducer akzeptiert jede Action in jedem Status –
// auch Übergänge, die die Statusfolge verbietet.
export const orderReducer = (state: Order, action: OrderAction): Order => {
  switch (action.type) {
    case 'itemAdded':
      return { ...state, items: [...state.items, action.item] };
    case 'itemRemoved':
      return {
        ...state,
        items: state.items.filter(
          (item) => item.productId !== action.productId
        ),
      };
    case 'placed':
      return { ...state, status: 'placed' };
    case 'paid':
      return { ...state, status: 'paid' };
    case 'shipped':
      return { ...state, status: 'shipped' };
    case 'cancelled':
      return { ...state, status: 'cancelled' };
  }
};
