import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vitest/config';

// Mini-API nur für npm run dev: Jede Bestellung klappt.
// Die Fehlerfälle spielst du in den Tests mit einem fetch-Stub durch.
const fakeOrdersApi = (): Plugin => ({
  name: 'fake-orders-api',
  configureServer(server) {
    server.middlewares.use('/api/orders', (_req, res) => {
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ id: 'o1004' }));
    });
  },
});

export default defineConfig({
  // React Compiler memoisiert Components und Hooks beim Build automatisch.
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    fakeOrdersApi(),
  ],
  test: { environment: 'jsdom', setupFiles: ['./src/test/setup.ts'] },
});
