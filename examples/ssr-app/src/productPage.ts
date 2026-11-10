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

// Checks the Initial Data in the client before React hydrates it.
export const isProductPageData = (value: unknown): value is ProductPageData =>
  isRecord(value) &&
  isRecord(value.product) &&
  typeof value.product.name === 'string' &&
  typeof value.product.priceCents === 'number' &&
  typeof value.product.stock === 'number' &&
  typeof value.description === 'string' &&
  Array.isArray(value.reviews);

// Runs only on the server – a database or an internal API could sit here.
export const loadProductPage = async (): Promise<ProductPageData> => ({
  product: products[0],
  description:
    'Auslösender Drehmomentschlüssel, 40 bis 200 Nm, mit Umschaltknarre für Rechts- und Linksgewinde.',
  reviews: [
    { id: 'r1', author: 'Lea', rating: 5, text: 'Löst sauber und hörbar aus.' },
    { id: 'r2', author: 'Tom', rating: 4, text: 'Etwas schwer, aber robust.' },
  ],
});

// Data for a <script type="application/json"> – escape "<" so that
// no "</script>" from the data closes the script tag early.
export const serializeProductPageData = (data: ProductPageData) =>
  JSON.stringify(data).replace(/</g, '\\u003c');
