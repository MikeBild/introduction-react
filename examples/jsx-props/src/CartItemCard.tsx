import { formatCents } from './shop';

// Übung: Dieser Vertrag ist zu locker und zu streng zugleich.
// variant akzeptiert jeden String, und jedes Feld ist Pflicht.
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
