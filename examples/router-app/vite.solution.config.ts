import babel from '@rolldown/plugin-babel';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Lösung: eigene App mit TanStack Router und File-based Routing in solution/routes.
export default defineConfig({
  root: 'solution',
  plugins: [
    // Muss vor dem React-Plugin stehen.
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: './routes',
      generatedRouteTree: './routeTree.gen.ts',
      quoteStyle: 'single',
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  build: { outDir: '../dist-solution', emptyOutDir: true },
});
