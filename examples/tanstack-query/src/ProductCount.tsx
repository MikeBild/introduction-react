import { useProducts } from './useProducts';

// A second Component with the same data – with the Custom Hook that means a second request.
export const ProductCount = ({ search }: { search: string }) => {
  const products = useProducts(search);
  return (
    <p>{products.status === 'success' && `${products.data.length} Treffer`}</p>
  );
};
