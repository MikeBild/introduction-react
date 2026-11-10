// @vitest-environment node
import { fileURLToPath } from 'node:url';
import { createServer, type ViteDevServer } from 'vite';
import { afterAll, beforeAll, expect, it } from 'vitest';

const fromHere = (path: string) =>
  fileURLToPath(new URL(path, import.meta.url));

// Starts the dev server with solution/vite.config.ts without opening a port.
let server: ViteDevServer;
beforeAll(async () => {
  server = await createServer({
    configFile: fromHere('./vite.config.ts'),
    server: { middlewareMode: true },
    logLevel: 'silent',
  });
});
afterAll(() => server.close());

it('forwards /api to the fake API on port 3000', () => {
  expect(server.config.server.proxy).toEqual({
    '/api': 'http://localhost:3000',
  });
});

it('resolves the alias @/ from the tsconfig', async () => {
  const resolved = await server.pluginContainer.resolveId(
    '@/shop',
    fromHere('./ProductList.tsx')
  );
  expect(resolved?.id).toBe(fromHere('../src/shop.ts'));
});
