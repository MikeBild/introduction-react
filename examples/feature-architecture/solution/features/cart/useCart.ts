import { useState } from 'react';

export const useCart = () => {
  const [productIds, setProductIds] = useState<readonly string[]>([]);
  const addToCart = (productId: string) =>
    setProductIds((currentProductIds) => [...currentProductIds, productId]);
  return { productIds, addToCart };
};
