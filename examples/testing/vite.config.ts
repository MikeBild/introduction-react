import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vitest/config';

// Mini-API nur für npm run dev: Jede Registrierung klappt.
// Die Fehlerfälle spielst du in den Tests mit einem fetch-Spy durch.
const fakeSignupApi = (): Plugin => ({
  name: 'fake-signup-api',
  configureServer(server) {
    server.middlewares.use('/api/signup', (_req, res) => {
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ id: 'u1' }));
    });
  },
});

export default defineConfig({
  // React Compiler memoisiert Components und Hooks beim Build automatisch.
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    fakeSignupApi(),
  ],
  test: { environment: 'jsdom', setupFiles: './src/test-setup.ts' },
});
