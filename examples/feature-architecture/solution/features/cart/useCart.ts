import { useState } from 'react';
import type { ProductId } from '../../shared/ids';

export const useCart = () => {
  const [productIds, setProductIds] = useState<readonly ProductId[]>([]);
  const addToCart = (id: ProductId) =>
    setProductIds((currentProductIds) => [...currentProductIds, id]);
  return { productIds, addToCart };
};
