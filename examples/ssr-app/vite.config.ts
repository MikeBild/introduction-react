import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ isSsrBuild }) => ({
  // React Compiler memoisiert Components und Hooks beim Build automatisch.
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  build: {
    // Client Build: Startpunkt und Lösung als zwei HTML-Einstiege.
    rolldownOptions: isSsrBuild
      ? {}
      : { input: { index: 'index.html', solution: 'solution.html' } },
  },
  test: { environment: 'jsdom', setupFiles: './src/test-setup.ts' },
}));
