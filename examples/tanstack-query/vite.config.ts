import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vitest/config';
import { createShopApi } from './src/fakeApi.ts';

// Mini-API nur für npm run dev: /api/products?q=…, /api/orders (GET, POST).
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
        // Etwas Latenz, damit du Loading States und Requests im Network-Tab siehst.
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
  // React Compiler memoisiert Components und Hooks beim Build automatisch.
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    fakeShopApi(),
  ],
  test: { environment: 'jsdom', setupFiles: './src/test-setup.ts' },
});
