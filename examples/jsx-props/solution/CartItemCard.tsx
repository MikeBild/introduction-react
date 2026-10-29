import { formatCents } from '../src/shop';

export type CartItemVariant = 'default' | 'compact' | 'highlighted';

export type CartItemCardProps = {
  name: string;
  priceCents: number;
  quantity?: number;
  variant?: CartItemVariant;
  note?: string;
};

export const CartItemCard = ({
  name,
  priceCents,
  quantity = 1,
  variant = 'default',
  note,
}: CartItemCardProps) => (
  <article className={`cart-item cart-item--${variant}`}>
    <h2>
      {variant === 'highlighted' && <span>★ </span>}
      {name}
    </h2>
    <p>
      {quantity} × {formatCents(priceCents)} ={' '}
      {formatCents(quantity * priceCents)}
    </p>
    {variant !== 'compact' && note && <p>{note}</p>}
  </article>
);
