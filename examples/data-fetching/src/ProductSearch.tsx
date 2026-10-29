import { useEffect, useState } from 'react';
import { formatCents, type Product } from './shop';

// Übung react-data-fetching: Dieser Fetch-Code hat mehrere Probleme.
// – Eine alte, langsame Antwort überschreibt die neue.
// – HTTP-Fehler wie 500 bleiben unbemerkt.
// – Die Antwort wird ungeprüft als Product[] benutzt.
// – Drei Booleans und Arrays statt eines Status.
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
