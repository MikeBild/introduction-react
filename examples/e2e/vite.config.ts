import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // React Compiler memoizes Components and Hooks automatically at build time.
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  server: {
    // Fixed address: Playwright waits for exactly this in the webServer config.
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    // The browser talks to only one origin; Vite forwards /api to the API.
    proxy: { '/api': 'http://127.0.0.1:3030' },
  },
});
