import { useEffect, useState } from 'react';
import { formatCents, type Product } from './shop';

// Übung react-rxjs: Debounce, Abbruch und Fehler – alles von Hand.
// – Der Timeout debounced, aber ein laufender Request wird nie gekündigt.
// – Eine alte, langsame Antwort überschreibt die neue.
// – Ein HTTP-Fehler landet ungeprüft im State.
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
