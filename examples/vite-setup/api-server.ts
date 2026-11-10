import { createServer } from 'node:http';
import { products } from './src/shop.ts';

// Fake API of the workshop shop: GET /api/products on port 3000.
// Node 26 runs this file directly (Type Stripping): npm run api
// Deliberately without CORS headers – in development everything goes through Vite's proxy.
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
