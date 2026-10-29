import { useState } from 'react';
import { AddToCartForm } from './AddToCartForm';
import { formatCents, products } from './shop';

const product = products[0];

export const App = () => {
  const [quantityInCart, setQuantityInCart] = useState(0);
  return (
    <main>
      <h1>{product.name}</h1>
      <p>
        {formatCents(product.priceCents)} · {product.stock} auf Lager
      </p>
      <AddToCartForm
        stock={product.stock}
        onAdd={(quantity) => setQuantityInCart((current) => current + quantity)}
      />
      <p>Im Warenkorb: {quantityInCart}</p>
    </main>
  );
};
