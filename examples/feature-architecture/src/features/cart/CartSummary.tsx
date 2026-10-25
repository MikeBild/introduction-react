import { formatPrice } from '../../shared/formatPrice';
import { Card } from '../../ui/Card';
import { findProductById } from '../catalog/products';

export const CartSummary = ({
  productIds,
}: {
  productIds: readonly string[];
}) => {
  const totalInCents = productIds
    .map((productId) => findProductById(productId)?.priceInCents ?? 0)
    .reduce((sum, priceInCents) => sum + priceInCents, 0);
  return (
    <Card header="Cart">
      {productIds.length} items, total {formatPrice(totalInCents)}
    </Card>
  );
};
