import { http, HttpResponse } from 'msw/http';

type StoredProduct = { id: string; name: string; priceInCents: number };

const initialProducts: readonly StoredProduct[] = [
  { id: 'p1', name: 'Kaffeebohnen', priceInCents: 1290 },
  { id: 'p2', name: 'Handmühle', priceInCents: 4900 },
];

let storedProducts = [...initialProducts];

// Setzt die In-Memory-Daten zwischen zwei Tests zurück.
export const resetProducts = () => {
  storedProducts = [...initialProducts];
};

export const handlers = [
  http.get('/api/products', () => HttpResponse.json(storedProducts)),
  http.post('/api/products', async ({ request }) => {
    const body = await request.json();
    if (
      typeof body !== 'object' ||
      body === null ||
      !('name' in body) ||
      typeof body.name !== 'string' ||
      !('priceInCents' in body) ||
      typeof body.priceInCents !== 'number'
    ) {
      return HttpResponse.json(
        { message: 'Ungültiges Produkt' },
        { status: 400 }
      );
    }
    const product = {
      id: crypto.randomUUID(),
      name: body.name,
      priceInCents: body.priceInCents,
    };
    storedProducts = [...storedProducts, product];
    return HttpResponse.json(product, { status: 201 });
  }),
];
