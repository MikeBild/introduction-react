import type { Product } from '../../../src/data/products';
import { Badge } from '../atoms/Badge';
import { Price } from '../atoms/Price';

export const ProductTile = ({ product }: { product: Product }) => (
  <li>
    <strong>{product.name}</strong> <Price amountInCents={product.priceCents} />{' '}
    {product.stock === 0 && <Badge>Ausverkauft</Badge>}
  </li>
);
