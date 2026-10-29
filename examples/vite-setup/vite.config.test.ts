// @vitest-environment node
import { fileURLToPath } from 'node:url';
import { createServer, type ViteDevServer } from 'vite';
import { afterAll, beforeAll, expect, it } from 'vitest';

const fromRoot = (path: string) =>
  fileURLToPath(new URL(path, import.meta.url));

// Startet den Dev Server mit vite.config.ts, ohne einen Port zu öffnen.
let server: ViteDevServer;
beforeAll(async () => {
  server = await createServer({
    configFile: fromRoot('./vite.config.ts'),
    server: { middlewareMode: true },
    logLevel: 'silent',
  });
});
afterAll(() => server.close());

// Übung: .skip entfernen
it.skip('leitet /api an die Fake-API auf Port 3000 weiter', () => {
  expect(server.config.server.proxy).toEqual({
    '/api': 'http://localhost:3000',
  });
});

it.skip('löst den Alias @/ aus der tsconfig auf', async () => {
  const resolved = await server.pluginContainer.resolveId(
    '@/shop',
    fromRoot('./src/features/products/ProductList.tsx')
  );
  expect(resolved?.id).toBe(fromRoot('./src/shop.ts'));
});
