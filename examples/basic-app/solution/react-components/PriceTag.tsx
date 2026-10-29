import { formatCents } from '../../src/shop';

type PriceTagProps = { cents: number };

export const PriceTag = ({ cents }: PriceTagProps) => (
  <span>{formatCents(cents)}</span>
);
