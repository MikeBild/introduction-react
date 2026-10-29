import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vitest/config';
import { searchCatalog } from './src/catalog.ts';

// Mini-API nur für npm run dev: GET /api/products?q=…
// Kurze Suchtexte antworten absichtlich langsamer – so siehst du im Browser,
// wie eine alte Antwort eine neue überholt.
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
  // React Compiler memoisiert Components und Hooks beim Build automatisch.
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    fakeProductsApi(),
  ],
  test: { environment: 'jsdom', setupFiles: './src/test-setup.ts' },
});
