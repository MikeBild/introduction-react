import express, { type Response } from 'express';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
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

const app = express();

let vite: ViteDevServer | undefined;
if (isProduction) {
  // Gehashte Assets aus dem Client-Build, aber nie die Templates selbst.
  app.use(express.static(clientDir, { index: false }));
} else {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  app.use(vite.middlewares);
}

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

const renderPage = async (url: string, res: Response) => {
  const { template, entry } = await loadTemplateAndEntry(url);
  const data = await entry.loadProductPage();
  const [head, tail] = template
    .replace('<!--initial-data-->', entry.serializeProductPageData(data))
    .split('<!--app-html-->');

  const { pipe, abort } = entry.render(data, {
    onShellReady() {
      res.status(200).type('html');
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
      res.status(500).send(String(error));
    },
    onError(error) {
      console.error(error);
    },
  });
  setTimeout(abort, 10_000);
};

// Express 5 leitet Fehler aus async Handlern selbst an next() weiter.
app.get('/{*path}', async (req, res) => {
  try {
    await renderPage(req.originalUrl, res);
  } catch (error) {
    if (error instanceof Error) vite?.ssrFixStacktrace(error);
    throw error;
  }
});

app.listen(port, () => {
  console.log(
    `${isSolution ? 'Lösung' : 'Startpunkt'} läuft auf http://localhost:${port}`
  );
});
