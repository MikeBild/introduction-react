import express, { type Response } from 'express';
import { PlaceOrderInput } from '../src/placeOrderInput.ts';
import {
  customerId,
  customers,
  orderId,
  products,
  type Order,
} from '../src/shop.ts';

// Die API des Werkstatt-Shops für die E2E-Tests: echtes HTTP, dasselbe Schema wie das Formular.
// Bestellungen liegen im Speicher; in deinem Projekt steht hier eine Test-Datenbank.
// Node 26 führt diese Datei direkt aus (Type Stripping).
const port = Number(process.env.API_PORT ?? 3030);

const orders = new Map<string, Order>();
let nextOrderNumber = 1004;

// Fehler am Feld: Das Formular zeigt message unter dem Feld mit diesem Pfad.
const reject = (res: Response, status: number, path: string, message: string) =>
  res.status(status).json({ path, message });

const app = express();
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/orders', (req, res) => {
  const result = PlaceOrderInput.safeParse(req.body);
  if (!result.success) {
    const issue = result.error.issues[0];
    return reject(
      res,
      400,
      issue?.path.join('.') ?? '',
      'Ungültige Bestellung'
    );
  }
  const input = result.data;
  if (!customers.some((customer) => customer.id === input.customerId))
    return reject(res, 400, 'customerId', 'Unbekannter Kunde');

  const items: Order['items'] = [];
  for (const [index, item] of input.items.entries()) {
    const product = products.find((entry) => entry.id === item.productId);
    if (!product)
      return reject(
        res,
        400,
        `items.${index}.productId`,
        'Unbekanntes Produkt'
      );
    if (item.quantity > product.stock)
      return reject(
        res,
        409,
        `items.${index}.quantity`,
        `Nur ${product.stock} auf Lager`
      );
    items.push({
      productId: product.id,
      quantity: item.quantity,
      priceCents: product.priceCents,
    });
  }

  const order: Order = {
    id: orderId(`o${nextOrderNumber++}`),
    customerId: customerId(input.customerId),
    items,
    status: 'placed',
    createdAt: new Date().toISOString(),
  };
  orders.set(order.id, order);
  res.status(201).json({ id: order.id });
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) return reject(res, 404, 'id', 'Bestellung nicht gefunden');
  res.json(order);
});

app.listen(port, '127.0.0.1', () => {
  console.log(`API läuft auf http://127.0.0.1:${port}`);
});
