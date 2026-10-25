export type CheckoutState =
  | { status: 'idle' | 'submitting' }
  | { status: 'success'; orderId: string }
  | { status: 'error'; message: string };

export type CheckoutAction =
  | { type: 'submitted' }
  | { type: 'succeeded'; orderId: string }
  | { type: 'failed'; message: string };

export const initialCheckoutState: CheckoutState = { status: 'idle' };

// The current state is ignored: every action is accepted in every state,
// even transitions the state diagram forbids.
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
