import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // React Compiler memoisiert Components und Hooks beim Build automatisch.
  // tailwindcss() erzeugt nur die Utilities, die im Code vorkommen.
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  test: { environment: 'jsdom', setupFiles: './src/test-setup.ts' },
});
