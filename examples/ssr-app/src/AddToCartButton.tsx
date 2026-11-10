import { useState } from 'react';

// The only interactive part of the page – it needs JavaScript in the browser.
export const AddToCartButton = ({ productName }: { productName: string }) => {
  const [quantity, setQuantity] = useState(0);
  return (
    <p>
      <button type="button" onClick={() => setQuantity(quantity + 1)}>
        {productName} in den Warenkorb
      </button>{' '}
      <output aria-label="Im Warenkorb">Im Warenkorb: {quantity}</output>
    </p>
  );
};
