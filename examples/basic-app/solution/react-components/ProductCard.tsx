import type { ReactNode } from 'react';
import { PriceTag } from './PriceTag';

type ProductCardProps = {
  name: string;
  priceCents: number;
  stock: number;
  action?: ReactNode;
};

export const ProductCard = ({
  name,
  priceCents,
  stock,
  action,
}: ProductCardProps) => (
  <article>
    <h2>{name}</h2>
    <PriceTag cents={priceCents} />
    {stock === 0 && <strong> Ausverkauft</strong>}
    {action}
  </article>
);
