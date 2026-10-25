import { useReducer } from 'react';
import type { PlaceOrder } from '../src/Checkout';
import { checkoutReducer, initialCheckoutState } from './checkoutReducer';

export const Checkout = ({ placeOrder }: { placeOrder: PlaceOrder }) => {
  const [checkoutState, dispatch] = useReducer(
    checkoutReducer,
    initialCheckoutState
  );

  const handleSubmit = async () => {
    dispatch({ type: 'submitted' });
    try {
      dispatch({ type: 'succeeded', orderId: await placeOrder() });
    } catch (error) {
      dispatch({ type: 'failed', message: String(error) });
    }
  };

  if (checkoutState.status === 'success')
    return (
      <>
        <p>Order {checkoutState.orderId} placed</p>
        <button onClick={() => dispatch({ type: 'reset' })}>New order</button>
      </>
    );

  return (
    <>
      {checkoutState.status === 'error' && (
        <p role="alert">{checkoutState.message}</p>
      )}
      <button
        disabled={checkoutState.status === 'submitting'}
        onClick={handleSubmit}
      >
        {checkoutState.status === 'submitting' ? 'Placing order …' : 'Order'}
      </button>
    </>
  );
};
