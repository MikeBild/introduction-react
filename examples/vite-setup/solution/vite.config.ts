import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  // React Compiler memoizes Components and Hooks automatically at build time.
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  // Aliases come from the tsconfig (paths) – you maintain them only there.
  resolve: { tsconfigPaths: true },
  // Everything under /api goes to the fake API. The browser sees only one origin,
  // CORS stays closed. vite preview takes over the proxy (preview.proxy).
  server: { proxy: { '/api': 'http://localhost:3000' } },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
    include: ['solution/**/*.test.{ts,tsx}'],
  },
});
