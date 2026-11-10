// @vitest-environment node
import { fileURLToPath } from 'node:url';
import { createServer, type ViteDevServer } from 'vite';
import { afterAll, beforeAll, expect, it } from 'vitest';

const fromRoot = (path: string) =>
  fileURLToPath(new URL(path, import.meta.url));

// Starts the dev server with vite.config.ts without opening a port.
let server: ViteDevServer;
beforeAll(async () => {
  server = await createServer({
    configFile: fromRoot('./vite.config.ts'),
    server: { middlewareMode: true },
    logLevel: 'silent',
  });
});
afterAll(() => server.close());

// Exercise: remove .skip
it.skip('forwards /api to the fake API on port 3000', () => {
  expect(server.config.server.proxy).toEqual({
    '/api': 'http://localhost:3000',
  });
});

it.skip('resolves the alias @/ from the tsconfig', async () => {
  const resolved = await server.pluginContainer.resolveId(
    '@/shop',
    fromRoot('./src/features/products/ProductList.tsx')
  );
  expect(resolved?.id).toBe(fromRoot('./src/shop.ts'));
});
