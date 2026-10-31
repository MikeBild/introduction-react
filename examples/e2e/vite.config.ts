import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // React Compiler memoisiert Components und Hooks beim Build automatisch.
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  server: {
    // Feste Adresse: Playwright wartet in der webServer-Config genau darauf.
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    // Der Browser spricht nur mit einer Origin; /api leitet Vite an die API weiter.
    proxy: { '/api': 'http://127.0.0.1:3030' },
  },
});
