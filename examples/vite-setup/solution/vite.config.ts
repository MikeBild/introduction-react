import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  // React Compiler memoisiert Components und Hooks beim Build automatisch.
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  // Aliase kommen aus der tsconfig (paths) – du pflegst sie nur dort.
  resolve: { tsconfigPaths: true },
  // Alles unter /api geht an die Fake-API. Der Browser sieht nur einen Origin,
  // CORS bleibt zu. vite preview übernimmt den Proxy (preview.proxy).
  server: { proxy: { '/api': 'http://localhost:3000' } },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
    include: ['solution/**/*.test.{ts,tsx}'],
  },
});
