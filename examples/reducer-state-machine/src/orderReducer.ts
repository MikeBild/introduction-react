import type { Order, OrderItem, ProductId } from './shop';

export type OrderAction =
  | { type: 'itemAdded'; item: OrderItem }
  | { type: 'itemRemoved'; productId: ProductId }
  | { type: 'placed' }
  | { type: 'paid' }
  | { type: 'shipped' }
  | { type: 'cancelled' };

// Exercise react-reducer: this Reducer accepts every Action in every status –
// including transitions that the status sequence forbids.
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
