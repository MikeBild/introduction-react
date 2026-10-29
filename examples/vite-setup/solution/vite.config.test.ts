// @vitest-environment node
import { fileURLToPath } from 'node:url';
import { createServer, type ViteDevServer } from 'vite';
import { afterAll, beforeAll, expect, it } from 'vitest';

const fromHere = (path: string) =>
  fileURLToPath(new URL(path, import.meta.url));

// Startet den Dev Server mit solution/vite.config.ts, ohne einen Port zu öffnen.
let server: ViteDevServer;
beforeAll(async () => {
  server = await createServer({
    configFile: fromHere('./vite.config.ts'),
    server: { middlewareMode: true },
    logLevel: 'silent',
  });
});
afterAll(() => server.close());

it('leitet /api an die Fake-API auf Port 3000 weiter', () => {
  expect(server.config.server.proxy).toEqual({
    '/api': 'http://localhost:3000',
  });
});

it('löst den Alias @/ aus der tsconfig auf', async () => {
  const resolved = await server.pluginContainer.resolveId(
    '@/shop',
    fromHere('./ProductList.tsx')
  );
  expect(resolved?.id).toBe(fromHere('../src/shop.ts'));
});
