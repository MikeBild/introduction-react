import { useQuery } from '@tanstack/react-query';
import { productsQuery } from './queries';

// Same queryKey as ProductList – the data comes from the cache.
export const ProductCount = ({ search }: { search: string }) => {
  const products = useQuery(productsQuery(search));
  return <p>{products.isSuccess && `${products.data.length} Treffer`}</p>;
};
