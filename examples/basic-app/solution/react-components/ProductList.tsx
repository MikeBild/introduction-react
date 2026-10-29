import type { ReactNode } from 'react';
import type { Product } from '../../src/shop';
import { ProductCard } from './ProductCard';

type ProductListProps = {
  products: readonly Product[];
  renderAction?: (product: Product) => ReactNode;
};

export const ProductList = ({ products, renderAction }: ProductListProps) => (
  <ul>
    {products.map((product) => (
      <li key={product.id}>
        <ProductCard
          name={product.name}
          priceCents={product.priceCents}
          stock={product.stock}
          action={renderAction?.(product)}
        />
      </li>
    ))}
  </ul>
);
