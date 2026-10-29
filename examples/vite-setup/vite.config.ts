import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { configDefaults, defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  // React Compiler memoisiert Components und Hooks beim Build automatisch.
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
    // Die Lösung bringt ihre eigene Konfiguration mit: npm run build:solution
    exclude: [...configDefaults.exclude, 'solution/**'],
  },
});
