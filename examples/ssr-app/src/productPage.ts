export type Product = {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
};

export type ProductPageData = { product: Product; reviews: Review[] };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

// Prüft die Initial Data im Client, bevor React sie hydriert.
export const isProductPageData = (value: unknown): value is ProductPageData =>
  isRecord(value) &&
  isRecord(value.product) &&
  typeof value.product.name === 'string' &&
  typeof value.product.priceInCents === 'number' &&
  Array.isArray(value.reviews);

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
