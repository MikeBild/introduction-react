import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ isSsrBuild }) => ({
  // React Compiler memoizes Components and Hooks automatically at build time.
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  build: {
    // Client build: starting point and solution as two HTML entry points.
    rolldownOptions: isSsrBuild
      ? {}
      : { input: { index: 'index.html', solution: 'solution.html' } },
  },
  test: { environment: 'jsdom', setupFiles: './src/test-setup.ts' },
}));
