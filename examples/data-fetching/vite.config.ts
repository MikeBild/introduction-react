import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vitest/config';
import { searchCatalog } from './src/catalog.ts';

// Mini API only for npm run dev: GET /api/products?q=…
// Short search texts deliberately respond more slowly – so you can see in the browser
// how an old response overtakes a new one.
const fakeProductsApi = (): Plugin => ({
  name: 'fake-products-api',
  configureServer(server) {
    server.middlewares.use('/api/products', (req, res) => {
      const search =
        new URL(req.url ?? '', 'http://localhost').searchParams.get('q') ?? '';
      const delayMs = Math.max(150, 1500 - search.length * 200);
      setTimeout(() => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(searchCatalog(search)));
      }, delayMs);
    });
  },
});

export default defineConfig({
  // React Compiler memoizes Components and Hooks automatically at build time.
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    fakeProductsApi(),
  ],
  test: { environment: 'jsdom', setupFiles: './src/test-setup.ts' },
});
