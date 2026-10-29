import type { OrderId } from '../src/shop';

export type CheckoutState =
  | { status: 'idle' | 'submitting' }
  | { status: 'success'; orderId: OrderId }
  | { status: 'error'; message: string };

export type CheckoutAction =
  | { type: 'submitted' }
  | { type: 'succeeded'; orderId: OrderId }
  | { type: 'failed'; message: string }
  | { type: 'reset' };

export const initialCheckoutState: CheckoutState = { status: 'idle' };

// Nur erlaubte Übergänge – alles andere behält den aktuellen State.
export const checkoutReducer = (
  state: CheckoutState,
  action: CheckoutAction
): CheckoutState => {
  switch (action.type) {
    case 'submitted':
      return state.status === 'idle' || state.status === 'error'
        ? { status: 'submitting' }
        : state;
    case 'succeeded':
      return state.status === 'submitting'
        ? { status: 'success', orderId: action.orderId }
        : state;
    case 'failed':
      return state.status === 'submitting'
        ? { status: 'error', message: action.message }
        : state;
    case 'reset':
      return state.status === 'success' ? initialCheckoutState : state;
  }
};
