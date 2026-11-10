import { useEffect, useState } from 'react';
import { formatCents, type Product } from './shop';

// Exercise react-rxjs: debounce, cancellation and errors – all by hand.
// – The timeout debounces, but a running request is never aborted.
// – An old, slow response overwrites the new one.
// – An HTTP error lands in the State unchecked.
export const ProductSearch = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetch(`/api/products?q=${encodeURIComponent(search)}`)
        .then((response) => response.json())
        .then(setProducts);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <>
      <input
        aria-label="Produktsuche"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} – {formatCents(product.priceCents)}
          </li>
        ))}
      </ul>
    </>
  );
};
