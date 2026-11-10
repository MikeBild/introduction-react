import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vitest/config';
import { createShopApi } from './src/fakeApi.ts';

// Mini API for npm run dev only: /api/products?q=…, /api/orders (GET, POST).
const fakeShopApi = (): Plugin => ({
  name: 'fake-shop-api',
  configureServer(server) {
    const handle = createShopApi();
    server.middlewares.use('/api', (req, res) => {
      let bodyText = '';
      req.on('data', (chunk: Buffer) => (bodyText += chunk.toString()));
      req.on('end', () => {
        const url = new URL(req.originalUrl ?? '', 'http://localhost');
        const { status, body } = handle(req.method ?? 'GET', url, bodyText);
        // Some latency so that you can see loading states and requests in the Network tab.
        setTimeout(() => {
          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(body));
        }, 300);
      });
    });
  },
});

export default defineConfig({
  // React Compiler memoizes Components and Hooks automatically at build time.
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    fakeShopApi(),
  ],
  test: { environment: 'jsdom', setupFiles: './src/test-setup.ts' },
});
