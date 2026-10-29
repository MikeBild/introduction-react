export type Product = { id: string; name: string; priceInCents: number };

const isProduct = (value: unknown): value is Product =>
  typeof value === 'object' &&
  value !== null &&
  'id' in value &&
  typeof value.id === 'string' &&
  'name' in value &&
  typeof value.name === 'string' &&
  'priceInCents' in value &&
  typeof value.priceInCents === 'number';

// Prüft die Antwort des Servers, statt ihr blind einen Typ zu geben.
export const isProductList = (value: unknown): value is Product[] =>
  Array.isArray(value) && value.every(isProduct);
