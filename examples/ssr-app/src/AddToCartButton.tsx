import { useState } from 'react';

// Der einzige interaktive Teil der Seite – er braucht JavaScript im Browser.
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
