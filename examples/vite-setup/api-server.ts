import { createServer } from 'node:http';
import { products } from './src/shop.ts';

// Fake-API des Werkstatt-Shops: GET /api/products auf Port 3000.
// Node 26 führt diese Datei direkt aus (Type Stripping): npm run api
// Absichtlich ohne CORS-Header – im Development läuft alles über den Proxy von Vite.
const port = Number(process.env.PORT ?? 3000);

const server = createServer((req, res) => {
  console.log(req.method, req.url);
  if (req.method === 'GET' && req.url === '/api/products') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
    return;
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(port, () => {
  console.log(`Fake-API läuft auf http://localhost:${port}/api/products`);
});
