import { catalog, searchCatalog } from './catalog.ts';
import { isPlaceOrderInput } from './placeOrderInput.ts';
import { customerId, orderId, orders, type Order } from './shop.ts';

type ApiResponse = { status: number; body: unknown };

const parseJson = (text: string): unknown => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

// Fake-API des Werkstatt-Shops. Läuft im Dev-Server (vite.config.ts)
// und in den Tests hinter einem fetch-Spy. Jede Instanz hat eigene Bestellungen.
export const createShopApi = () => {
  const storedOrders: Order[] = [...orders];

  const placeOrder = (bodyText: string): ApiResponse => {
    const input = parseJson(bodyText);
    if (!isPlaceOrderInput(input))
      return { status: 400, body: { message: 'Ungültige Bestellung' } };
    const items = input.items.flatMap((item) => {
      const product = catalog.find(({ id }) => id === item.productId);
      return product
        ? [
            {
              productId: product.id,
              quantity: item.quantity,
              priceCents: product.priceCents,
            },
          ]
        : [];
    });
    if (items.length !== input.items.length)
      return { status: 400, body: { message: 'Unbekanntes Produkt' } };
    const order: Order = {
      id: orderId(`o${1001 + storedOrders.length}`),
      customerId: customerId(input.customerId),
      items,
      status: 'placed',
      createdAt: new Date().toISOString(),
    };
    storedOrders.push(order);
    return { status: 201, body: order };
  };

  return (method: string, url: URL, bodyText = ''): ApiResponse => {
    if (method === 'GET' && url.pathname === '/api/products')
      return {
        status: 200,
        body: searchCatalog(url.searchParams.get('q') ?? ''),
      };
    if (method === 'GET' && url.pathname === '/api/orders')
      return { status: 200, body: storedOrders };
    if (method === 'POST' && url.pathname === '/api/orders')
      return placeOrder(bodyText);
    return { status: 404, body: { message: 'Not Found' } };
  };
};

export type ShopApi = ReturnType<typeof createShopApi>;
