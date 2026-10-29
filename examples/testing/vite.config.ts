import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { msw } from 'msw/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // React Compiler memoisiert Components und Hooks beim Build automatisch.
  // msw() liefert im Dev-Modus den Service Worker für die Mock-API aus.
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), msw()],
  test: { environment: 'jsdom', setupFiles: './src/test-setup.ts' },
});
