# Suspense und Errors

Eine Bestelldetail-Seite, die Bestellung und Versandstatus mit `use()` lädt. Heute fängt eine einzige, selbst geschriebene Error-Boundary-Klasse alle Errors – ohne Retry. Fällt nur die langsame Sendungsverfolgung aus, ist die ganze Seite weg.

Lektion: **Wo wird gewartet, wo werden Errors gefangen?** (`react-suspense-errors`).

```bash
npm install
npm run dev
npm test
```

Im Browser fällt der Versandstatus beim ersten Laden absichtlich aus, und Bestellung `o-2` gibt es nicht. So siehst du beide Fehlerfälle.

## Übung

1. Ersetze die Klasse aus `src/ErrorBoundary.tsx` durch `ErrorBoundary` aus [react-error-boundary](https://github.com/bvaughn/react-error-boundary) und lösch die Datei. Das ist die einzige Class Component im Repo – nach der Übung gibt es keine mehr.
2. Schreib eine `FallbackComponent`, die die Meldung des Errors zeigt und einen Button „Erneut laden“ mit `resetErrorBoundary` hat. Der Error ist `unknown`, prüf ihn mit `instanceof Error`.
3. Wirf vor dem Retry das abgelehnte Promise aus dem Cache: `onReset={() => orderCache.forgetOrder(orderId)}`. Sonst rendert `use()` wieder denselben Error.
4. Gib dem Versandstatus eine eigene, innere Kombination aus `ErrorBoundary` und `Suspense`. Die Bestellung erscheint dann sofort, der Versandstatus folgt oder zeigt „Versandstatus ist gerade nicht verfügbar.“.
5. Entferne `.skip` in `src/OrderDetailPage.test.tsx`.

Merke: Das Promise für `use()` entsteht in `src/orderCache.ts`, nicht beim Rendern. Und `use()` steht nie in einem `try`/`catch` – Errors fängt die Boundary.

## Lösung

`solution/OrderDetailPage.tsx` mit zwei verschachtelten Boundaries, `solution/App.tsx` und die Tests in `solution/OrderDetailPage.test.tsx`.

Um die Lösung im Browser zu sehen, ändere den Import in `src/main.tsx` auf `../solution/App`.
