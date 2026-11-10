import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { configDefaults, defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  // React Compiler memoizes Components and Hooks automatically at build time.
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
    // The solution brings its own configuration: npm run build:solution
    exclude: [...configDefaults.exclude, 'solution/**'],
  },
});
