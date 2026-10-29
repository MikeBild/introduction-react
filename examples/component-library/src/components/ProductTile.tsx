import type { Product } from '../data/products';
import { Badge } from './Badge';
import { Price } from './Price';

export const ProductTile = ({ product }: { product: Product }) => (
  <li>
    <strong>{product.name}</strong>{' '}
    <Price amountInCents={product.priceInCents} />{' '}
    {product.isNew && <Badge>Neu</Badge>}
  </li>
);
