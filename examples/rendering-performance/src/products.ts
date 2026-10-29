import { productId, type Product } from './shop';

export type { Product } from './shop';

const toolNames = [
  'Drehmomentschlüssel',
  'Steckschlüsselsatz',
  'Werkstattwagen',
  'Schraubendreher-Set',
] as const;

// 2.000 Zeilen – genug, damit jedes unnötige Rendering messbar wird.
export const products: readonly Product[] = Array.from(
  { length: 2000 },
  (_, index) => ({
    id: productId(`p${index + 1}`),
    name: `${toolNames[index % toolNames.length]} ${index + 1}`,
    priceCents: 199 + ((index * 137) % 9800),
    stock: (index * 7) % 25,
  })
);
