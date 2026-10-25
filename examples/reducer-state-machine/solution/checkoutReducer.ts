export type CheckoutState =
  | { status: 'idle' | 'submitting' }
  | { status: 'success'; orderId: string }
  | { status: 'error'; message: string };

export type CheckoutAction =
  | { type: 'submitted' }
  | { type: 'succeeded'; orderId: string }
  | { type: 'failed'; message: string }
  | { type: 'reset' };

export const initialCheckoutState: CheckoutState = { status: 'idle' };

// Allowed transitions only – anything else keeps the current state.
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
