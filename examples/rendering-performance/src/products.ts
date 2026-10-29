export type Product = {
  id: string;
  name: string;
  category: string;
  priceInCents: number;
};

const categories = ['Kaffee', 'Tee', 'Zubehör', 'Geschirr'] as const;

// 2.000 Zeilen – genug, damit jedes unnötige Rendering messbar wird.
export const products: readonly Product[] = Array.from(
  { length: 2000 },
  (_, index) => ({
    id: `p${index + 1}`,
    name: `Produkt ${index + 1}`,
    category: categories[index % categories.length]!,
    priceInCents: 199 + ((index * 137) % 9800),
  })
);
