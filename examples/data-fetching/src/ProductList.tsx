import { useEffect, useState } from 'react';

type Product = { id: string; name: string; priceInCents: number };

// Übung react-data-fetching: So sieht Data Fetching mit useEffect oft aus.
// Drei useState, kein Abbruch, kein Blick auf response.ok, ungeprüfte Daten.
// Ersetze das durch fetch + use() + Suspense und einen kleinen eigenen Hook.
export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products.json')
      .then((response) => response.json())
      .then((data: Product[]) => setProducts(data))
      .catch(() => setError('Fehler beim Laden'))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Lädt …</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name} – {(product.priceInCents / 100).toFixed(2)} €
        </li>
      ))}
    </ul>
  );
};
