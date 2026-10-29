import { readFile } from 'node:fs/promises';
import { createServer, type ServerResponse } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { Transform } from 'node:stream';
import { pathToFileURL } from 'node:url';
import type { ViteDevServer } from 'vite';

// Node 26 führt diese Datei direkt aus (Type Stripping), ohne Build-Schritt.
type EntryServer = typeof import('./src/entry-server.tsx');

// Flags statt Umgebungsvariablen, damit die Scripts auch unter Windows laufen.
const isProduction = process.argv.includes('--production');
const isSolution = process.argv.includes('--solution');
// React lädt seinen Production Build erst beim dynamischen Import unten.
if (isProduction) process.env.NODE_ENV = 'production';
const port = Number(process.env.PORT ?? 5173);
const templateFile = isSolution ? 'solution.html' : 'index.html';
const clientDir = join(import.meta.dirname, 'dist/client');

const contentTypes: Record<string, string> = {
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
};

let vite: ViteDevServer | undefined;
if (!isProduction) {
  const { createServer: createViteServer } = await import('vite');
  vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
}

const serveStaticAsset = async (pathname: string, res: ServerResponse) => {
  const filePath = normalize(join(clientDir, pathname));
  if (!filePath.startsWith(clientDir)) return false;
  try {
    const content = await readFile(filePath);
    res.setHeader(
      'Content-Type',
      contentTypes[extname(filePath)] ?? 'application/octet-stream'
    );
    res.end(content);
    return true;
  } catch {
    return false;
  }
};

const isEntryServer = (
  module: Record<string, unknown>
): module is EntryServer =>
  typeof module.render === 'function' &&
  typeof module.loadProductPage === 'function' &&
  typeof module.serializeProductPageData === 'function';

const loadTemplateAndEntry = async (url: string) => {
  const template = vite
    ? await vite.transformIndexHtml(url, await readFile(templateFile, 'utf-8'))
    : await readFile(join(clientDir, templateFile), 'utf-8');
  const entry: Record<string, unknown> = vite
    ? await vite.ssrLoadModule('/src/entry-server.tsx')
    : await import(
        pathToFileURL(join(import.meta.dirname, 'dist/server/entry-server.js'))
          .href
      );
  if (!isEntryServer(entry)) throw new Error('entry-server ist unvollständig');
  return { template, entry };
};

const renderPage = async (url: string, res: ServerResponse) => {
  const { template, entry } = await loadTemplateAndEntry(url);
  const data = await entry.loadProductPage();
  const [head, tail] = template
    .replace('<!--initial-data-->', entry.serializeProductPageData(data))
    .split('<!--app-html-->');

  const { pipe, abort } = entry.render(data, {
    onShellReady() {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.write(head);
      const htmlStream = new Transform({
        transform(chunk, encoding, callback) {
          res.write(chunk, encoding);
          callback();
        },
      });
      htmlStream.on('finish', () => res.end(tail));
      pipe(htmlStream);
    },
    onShellError(error) {
      res.statusCode = 500;
      res.end(String(error));
    },
    onError(error) {
      console.error(error);
    },
  });
  setTimeout(abort, 10_000);
};

createServer((req, res) => {
  const url = req.url ?? '/';
  const handle = async () => {
    if (!isProduction || url === '/' || !(await serveStaticAsset(url, res)))
      await renderPage(url, res);
  };
  if (vite) {
    vite.middlewares(req, res, () => {
      handle().catch((error: unknown) => {
        if (error instanceof Error) vite?.ssrFixStacktrace(error);
        console.error(error);
        res.statusCode = 500;
        res.end(String(error));
      });
    });
    return;
  }
  handle().catch((error: unknown) => {
    console.error(error);
    res.statusCode = 500;
    res.end(String(error));
  });
}).listen(port, () => {
  console.log(
    `${isSolution ? 'Lösung' : 'Startpunkt'} läuft auf http://localhost:${port}`
  );
});
