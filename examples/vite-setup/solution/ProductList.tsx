import { useEffect, useState } from 'react';
import { formatCents, type Product } from '@/shop';
import { fetchProducts } from './fetchProducts';

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; products: Product[] };

export const ProductList = () => {
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let ignore = false;
    fetchProducts().then(
      (products) => {
        if (!ignore) setState({ status: 'success', products });
      },
      (error: unknown) => {
        if (!ignore)
          setState({
            status: 'error',
            message: error instanceof Error ? error.message : String(error),
          });
      }
    );
    return () => {
      ignore = true;
    };
  }, []);

  if (state.status === 'loading') return <p>Lade Produkte …</p>;
  if (state.status === 'error')
    return <p role="alert">Produkte nicht geladen: {state.message}</p>;
  return (
    <ul>
      {state.products.map((product) => (
        <li key={product.id}>
          {product.name} – {formatCents(product.priceCents)}
        </li>
      ))}
    </ul>
  );
};
