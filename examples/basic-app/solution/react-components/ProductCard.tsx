import type { Product } from '../../src/products';
import { PriceTag } from './PriceTag';

type ProductCardProps = { product: Product };

export const ProductCard = ({ product }: ProductCardProps) => (
  <li>
    <h2>{product.name}</h2>
    <PriceTag amountInCents={product.priceInCents} />
    {!product.isInStock && <strong> ausverkauft</strong>}
  </li>
);
