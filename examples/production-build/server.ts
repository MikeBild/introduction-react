import express from 'express';
import { join } from 'node:path';

// Server für die Produktion: liefert die App aus dist/ aus und nimmt Error Reports an.
// Node 26 führt diese Datei direkt aus (Type Stripping).
const port = Number(process.env.PORT ?? 4173);
const distDir = join(import.meta.dirname, 'dist');

const app = express();

// sendBeacon schickt den Report als text/plain.
app.post(
  '/api/client-errors',
  express.text({ type: '*/*', limit: '10kb' }),
  (req, res) => {
    console.warn('client error', req.body);
    res.status(204).end();
  }
);

// Gehashte Assets dürfen lange im Cache liegen, index.html nie.
app.use(
  '/assets',
  express.static(join(distDir, 'assets'), { immutable: true, maxAge: '1y' })
);
app.use(express.static(distDir, { index: false }));
app.get('/{*path}', (_req, res) => {
  res.set('Cache-Control', 'no-cache').sendFile(join(distDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server für die Produktion läuft auf http://localhost:${port}`);
});
