import type { ProductId } from '../../shared/ids';
import { formatCents } from '../../shared/money';
import { Card } from '../../ui/Card';
import { findProductById } from '../catalog';

export const CartSummary = ({
  productIds,
}: {
  productIds: readonly ProductId[];
}) => {
  const totalCents = productIds
    .map((id) => findProductById(id)?.priceCents ?? 0)
    .reduce((sum, priceCents) => sum + priceCents, 0);
  return (
    <Card header="Warenkorb">
      {productIds.length} Positionen, Summe {formatCents(totalCents)}
    </Card>
  );
};
