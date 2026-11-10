import express from 'express';
import { join } from 'node:path';

// Production server: serves the app from dist/ and accepts error reports.
// Node 26 runs this file directly (Type Stripping).
const port = Number(process.env.PORT ?? 4173);
const distDir = join(import.meta.dirname, 'dist');

const app = express();

// sendBeacon sends the report as text/plain.
app.post(
  '/api/client-errors',
  express.text({ type: '*/*', limit: '10kb' }),
  (req, res) => {
    console.warn('client error', req.body);
    res.status(204).end();
  }
);

// Hashed assets may stay in the cache for a long time, index.html never.
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
