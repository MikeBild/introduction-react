import { useReducer } from 'react';
import { checkoutReducer, initialCheckoutState } from './checkoutReducer';

export type PlaceOrder = () => Promise<string>;

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
    return <p>Order {checkoutState.orderId} placed</p>;

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
