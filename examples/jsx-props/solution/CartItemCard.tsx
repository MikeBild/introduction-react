import { formatPrice } from '../src/formatPrice';

export type CartItemVariant = 'default' | 'compact' | 'highlighted';

export type CartItemCardProps = {
  name: string;
  priceInCents: number;
  quantity?: number;
  variant?: CartItemVariant;
  note?: string;
};

export const CartItemCard = ({
  name,
  priceInCents,
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
      {quantity} × {formatPrice(priceInCents)} ={' '}
      {formatPrice(quantity * priceInCents)}
    </p>
    {variant !== 'compact' && note && <p>{note}</p>}
  </article>
);
