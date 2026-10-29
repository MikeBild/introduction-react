import { useReducer } from 'react';
import { checkoutReducer, initialCheckoutState } from './checkoutReducer';
import { errorText } from './errorText';
import type { OrderId } from './shop';

export type PlaceOrder = () => Promise<OrderId>;

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
      dispatch({ type: 'failed', message: errorText(error) });
    }
  };

  if (checkoutState.status === 'success')
    return <p>Bestellung {checkoutState.orderId} ist eingegangen</p>;

  return (
    <>
      {checkoutState.status === 'error' && (
        <p role="alert">{checkoutState.message}</p>
      )}
      <button
        disabled={checkoutState.status === 'submitting'}
        onClick={handleSubmit}
      >
        {checkoutState.status === 'submitting'
          ? 'Bestellung läuft …'
          : 'Bestellen'}
      </button>
    </>
  );
};
