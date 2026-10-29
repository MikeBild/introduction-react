import { useProducts } from './useProducts';

// Zweite Component mit denselben Daten – mit dem eigenen Hook ein zweiter Request.
export const ProductCount = ({ search }: { search: string }) => {
  const products = useProducts(search);
  return (
    <p>{products.status === 'success' && `${products.data.length} Treffer`}</p>
  );
};
