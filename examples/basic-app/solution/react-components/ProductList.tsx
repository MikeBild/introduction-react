import type { Product } from '../../src/products';
import { ProductCard } from './ProductCard';

type ProductListProps = { products: readonly Product[] };

export const ProductList = ({ products }: ProductListProps) => (
  <ul>
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </ul>
);
