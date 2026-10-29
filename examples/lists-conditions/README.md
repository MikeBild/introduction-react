# Lists und Conditions

Die Bestellübersicht des Werkstatt-Shops kennt nur den Happy Path und nutzt die Position in der Liste als Key. Du ergänzt eigene Ansichten für Loading, Error und Empty und gibst jedem Eintrag einen stabilen Key.

Lektion: **Keys sind Identität, nicht Position** (`react-lists-conditions`)

```bash
npm install
npm run dev
npm test
```

## Übung

1. Starte die App, setz bei Bestellung o1001 den Haken und klick auf „Neue Bestellung oben einfügen“. Beobachte, bei welcher Bestellung der Haken jetzt steht.
2. Ersetze in `src/OrderOverview.tsx` den Index als Key durch `order.id`. Wiederhole Schritt 1.
3. Ergänze eigene Ansichten für die drei anderen Situationen aus `OrdersState`:
   - Loading: `<p role="status">Bestellungen werden geladen …</p>`
   - Error: ein Element mit `role="alert"`, das die Meldung aus dem State zeigt
   - Empty: „Noch keine Bestellungen“ statt einer leeren Liste
4. Entferne `.skip` in `src/OrderOverview.test.tsx` Schritt für Schritt.

Die Bestellungen kommen aus `src/shop.ts`: `Order` mit `status`, `customerId` und `items`. Die Summe berechnest du mit `orderTotalCents`.

Tipp: Ein `switch` über `state.status` lässt TypeScript prüfen, dass du keinen Fall vergessen hast.

## Lösung

`solution/OrderOverview.tsx` mit Tests in `solution/OrderOverview.test.tsx`. Um die Lösung im Browser zu sehen, ändere den Import in `src/App.tsx` auf `../solution/OrderOverview`.
