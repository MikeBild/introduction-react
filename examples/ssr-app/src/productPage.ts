import { z } from 'zod';

export const ProductPageDataSchema = z.object({
  product: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    priceInCents: z.number().int(),
  }),
  reviews: z.array(
    z.object({
      id: z.string(),
      author: z.string(),
      rating: z.number().int().min(1).max(5),
      text: z.string(),
    })
  ),
});

export type ProductPageData = z.infer<typeof ProductPageDataSchema>;

// Läuft nur auf dem Server – hier könnte eine Datenbank oder ein internes API stehen.
export const loadProductPage = async (): Promise<ProductPageData> => ({
  product: {
    id: 'p2',
    name: 'Handmühle',
    description:
      'Keramikmahlwerk, stufenlos einstellbar, für Espresso bis French Press.',
    priceInCents: 4900,
  },
  reviews: [
    { id: 'r1', author: 'Lea', rating: 5, text: 'Mahlt sehr gleichmäßig.' },
    { id: 'r2', author: 'Tom', rating: 4, text: 'Braucht etwas Kraft.' },
  ],
});

// Daten für ein <script type="application/json"> – "<" escapen, damit
// kein "</script>" aus den Daten das Script-Tag vorzeitig schließt.
export const serializeProductPageData = (data: ProductPageData) =>
  JSON.stringify(data).replace(/</g, '\\u003c');
