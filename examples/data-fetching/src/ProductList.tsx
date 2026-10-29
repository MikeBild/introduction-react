import { useEffect, useState, type SubmitEvent } from 'react';

type Product = { id: string; name: string; priceInCents: number };

// Übung react-data-fetching: So sah Server State früher aus – Loading-Flag,
// Error-Flag, manuelles Nachladen und ungeprüfte Daten vom Server.
// Ersetze das durch useQuery, useMutation und ein zod-Schema.
export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    fetch('/api/products')
      .then((response) => response.json())
      .then((data: Product[]) => {
        if (!isCancelled) setProducts(data);
      })
      .catch(() => {
        if (!isCancelled) setError('Fehler beim Laden');
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });
    return () => {
      isCancelled = true;
    };
  }, [reloadCount]);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        priceInCents: Number(formData.get('priceInCents')),
      }),
    });
    form.reset();
    setReloadCount((count) => count + 1);
  };

  if (isLoading && products.length === 0) return <p>Lädt …</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} – {(product.priceInCents / 100).toFixed(2)} €
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required />
        <label htmlFor="priceInCents">Preis in Cent</label>
        <input id="priceInCents" name="priceInCents" type="number" required />
        <button type="submit">Hinzufügen</button>
      </form>
    </>
  );
};
