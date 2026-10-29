# RxJS

Die Produktsuche des Werkstatt-Shops mit Debounce von Hand: ein `setTimeout` im Effect, dazu `fetch` ohne Abbruch und ohne Fehlerbehandlung. Debounce, Kündigen und Fehler sind Abläufe über die Zeit – genau dafür ist RxJS gebaut.

Zusatzkapitel: **Wann lohnt sich RxJS in React?** (`react-rxjs`)

```bash
npm install
npm run dev
npm test
```

`npm run dev` startet eine Fake-API unter `/api/products?q=…`. Kurze Suchtexte antworten absichtlich langsamer.

## Übung

1. Tipp im Browser „boh“, warte kurz und tipp weiter bis „bohrer“. Kurz danach springt die Liste zurück auf die Treffer für „boh“.
2. Bau in `src/createProductSearch.ts` eine Funktion `createProductSearch()` ohne React: Ein `Subject<string>` nimmt die Eingaben auf, `debounceTime(300)` und `distinctUntilChanged()` filtern, `switchMap` lädt per `fromFetch` und kündigt die alte Suche. `catchError` im inneren Stream liefert bei Fehlern eine leere Liste.
3. Schreib einen Hook `useObservable(source$, initialValue)`, der im Effect abonniert und im Cleanup kündigt.
4. Leg in `ProductSearch` pro Component eine eigene Suche mit `useState(createProductSearch)` an und zeig die Treffer per `useObservable`. Lösch den Effect und den Timeout.
5. Entferne `.skip` in `src/ProductSearch.test.tsx`.

## Wann lohnt es sich?

RxJS lohnt sich bei Zeitlogik, mehreren Quellen und Retries. Für einen Wert pro Render reichen State und Hooks – vergleich den Code mit dem Hook `useProducts` aus `examples/data-fetching`. Übergib nie ein Observable in Props oder Context: React bekommt nur den letzten Wert.

## Lösung

- `solution/createProductSearch.ts` – der Stream mit `debounceTime`, `switchMap` und `catchError`
- `solution/useObservable.ts` – der Hook zwischen Stream und State
- `solution/ProductSearch.tsx` und `solution/App.tsx`
- `solution/createProductSearch.test.ts` – der Stream ohne React, mit Fake Timers
- `solution/ProductSearch.test.tsx` – Kündigen, Reihenfolge, Fehler

Um die Lösung im Browser zu sehen, ändere den Import in `src/main.tsx` auf `../solution/App`.
