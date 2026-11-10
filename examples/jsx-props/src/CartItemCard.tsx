import { formatCents } from './shop';

// Exercise: this contract is too loose and too strict at the same time.
// variant accepts any string, and every field is required.
type CartItemCardProps = {
  name: string;
  priceCents: number;
  quantity: number;
  variant: string;
  note: string;
};

export const CartItemCard = ({
  name,
  priceCents,
  quantity,
  variant,
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
    {variant !== 'compact' && note !== '' && <p>{note}</p>}
  </article>
);
