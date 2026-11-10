import { useEffect, useState } from 'react';
import { formatCents, type Product } from './shop';

// Exercise react-data-fetching: this fetch code has several problems.
// – An old, slow response overwrites the new one.
// – HTTP errors like 500 go unnoticed.
// – The response is used as Product[] without validation.
// – Three booleans and arrays instead of one status.
// – Errors appear raw as String(error), without a next step.
export const ProductSearch = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/products?q=${encodeURIComponent(search)}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((caughtError) => {
        setError(String(caughtError));
        setIsLoading(false);
      });
  }, [search]);

  return (
    <section>
      <label htmlFor="search">Produktsuche</label>
      <input
        id="search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {isLoading && <p>Lade Produkte …</p>}
      {error && <p role="alert">{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} – {formatCents(product.priceCents)}
          </li>
        ))}
      </ul>
    </section>
  );
};
