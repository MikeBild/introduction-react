import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // React Compiler memoizes Components and Hooks automatically at build time.
  // tailwindcss() only generates the utilities that appear in the code.
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  test: { environment: 'jsdom', setupFiles: './src/test-setup.ts' },
});
