import { useQuery } from '@tanstack/react-query';
import { productsQuery } from './queries';

// Gleicher queryKey wie ProductList – die Daten kommen aus dem Cache.
export const ProductCount = ({ search }: { search: string }) => {
  const products = useQuery(productsQuery(search));
  return <p>{products.isSuccess && `${products.data.length} Treffer`}</p>;
};
