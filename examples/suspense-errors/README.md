# Suspense und Errors

Die Bestelldetails im Werkstatt-Shop: Bestellung und Versandstatus laden heute mit einem eigenen Effect-Hook. Jede Component prüft Loading und Error selbst, und nach einem Error gibt es keinen Retry.

Lektion: **Wo wird gewartet, wo werden Errors gefangen?** (`react-suspense-errors`)

```bash
npm install
npm run dev
npm test
```

Im Browser fällt der Versandstatus beim ersten Laden absichtlich aus, und Bestellung `o9999` gibt es nicht. So siehst du beide Fehlerfälle.

## Übung

1. Lies `src/OrderDetailPage.tsx`. Zähl, wie oft dort `loading` und `error` geprüft werden.
2. Lies die Bestellung mit `use(orderCache.readOrder(orderId))`. Der Cache in `src/orderCache.ts` legt das Promise einmal pro Bestellung in eine `Map` – nie beim Rendern. Die Component beschreibt danach nur noch den Erfolgsfall.
3. Setz um den Bereich eine `ErrorBoundary` aus [react-error-boundary](https://github.com/bvaughn/react-error-boundary) und darin ein `Suspense` mit „Bestellung lädt …“. Schreib keine eigene Class Component.
4. Schreib eine `FallbackComponent` mit der Meldung des Errors und einem Button „Erneut laden“, der `resetErrorBoundary` aufruft. Der Error ist `unknown`, prüf ihn mit `instanceof Error`.
5. Lösch vor dem Retry das abgelehnte Promise: `onReset={() => orderCache.forgetOrder(orderId)}`. Sonst liefert `use()` wieder denselben Error.
6. Gib dem Versandstatus einen eigenen Bereich mit `ErrorBoundary` und `Suspense`. Die Bestellung erscheint dann sofort, der Versandstatus folgt oder zeigt „Versandstatus ist gerade nicht verfügbar.“ mit dem Button „Versandstatus erneut laden“.
7. Entferne `.skip` in `src/OrderDetailPage.test.tsx`.

`use()` steht nie in einem `try`/`catch`, Errors fängt die Boundary.

## Lösung

`solution/OrderDetailPage.tsx` mit zwei verschachtelten Bereichen, `solution/App.tsx` und die Tests in `solution/OrderDetailPage.test.tsx`.

Um die Lösung im Browser zu sehen, ändere den Import in `src/main.tsx` auf `../solution/App`.
