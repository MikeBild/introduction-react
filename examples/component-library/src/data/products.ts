import { products } from '../shop';

export { products, type Product } from '../shop';

export const searchProducts = (searchText: string) => {
  const normalizedSearchText = searchText.trim().toLowerCase();
  return products.filter((product) =>
    product.name.toLowerCase().includes(normalizedSearchText)
  );
};
