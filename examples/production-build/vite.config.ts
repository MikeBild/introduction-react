import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // React Compiler memoisiert Components und Hooks beim Build automatisch.
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  test: { environment: 'jsdom', setupFiles: './src/test-setup.ts' },
});
