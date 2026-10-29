import { products, type Product } from './shop';

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
};

export type ProductPageData = {
  product: Product;
  description: string;
  reviews: Review[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

// Prüft die Initial Data im Client, bevor React sie hydriert.
export const isProductPageData = (value: unknown): value is ProductPageData =>
  isRecord(value) &&
  isRecord(value.product) &&
  typeof value.product.name === 'string' &&
  typeof value.product.priceCents === 'number' &&
  typeof value.product.stock === 'number' &&
  typeof value.description === 'string' &&
  Array.isArray(value.reviews);

// Läuft nur auf dem Server – hier könnte eine Datenbank oder ein internes API stehen.
export const loadProductPage = async (): Promise<ProductPageData> => ({
  product: products[0],
  description:
    'Auslösender Drehmomentschlüssel, 40 bis 200 Nm, mit Umschaltknarre für Rechts- und Linksgewinde.',
  reviews: [
    { id: 'r1', author: 'Lea', rating: 5, text: 'Löst sauber und hörbar aus.' },
    { id: 'r2', author: 'Tom', rating: 4, text: 'Etwas schwer, aber robust.' },
  ],
});

// Daten für ein <script type="application/json"> – "<" escapen, damit
// kein "</script>" aus den Daten das Script-Tag vorzeitig schließt.
export const serializeProductPageData = (data: ProductPageData) =>
  JSON.stringify(data).replace(/</g, '\\u003c');
