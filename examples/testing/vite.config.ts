import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vitest/config';

// Mini API for npm run dev only: every order succeeds.
// You play through the error cases in the tests with a fetch stub.
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
  // React Compiler memoizes Components and Hooks automatically at build time.
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    fakeOrdersApi(),
  ],
  test: { environment: 'jsdom', setupFiles: ['./src/test/setup.ts'] },
});
