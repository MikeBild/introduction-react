import type { OrderId } from './shop';

export type CheckoutState =
  | { status: 'idle' | 'submitting' }
  | { status: 'success'; orderId: OrderId }
  | { status: 'error'; message: string };

export type CheckoutAction =
  | { type: 'submitted' }
  | { type: 'succeeded'; orderId: OrderId }
  | { type: 'failed'; message: string };

export const initialCheckoutState: CheckoutState = { status: 'idle' };

// Übung react-reducer: Der aktuelle State wird ignoriert – jede Action gilt
// in jedem State, auch wenn das Diagramm den Übergang verbietet.
export const checkoutReducer = (
  _state: CheckoutState,
  action: CheckoutAction
): CheckoutState => {
  switch (action.type) {
    case 'submitted':
      return { status: 'submitting' };
    case 'succeeded':
      return { status: 'success', orderId: action.orderId };
    case 'failed':
      return { status: 'error', message: action.message };
  }
};
