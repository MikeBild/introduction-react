# JSX und Props

Eine Karte für einen Warenkorb-Eintrag im Werkstatt-Shop. Ihr Props-Vertrag ist zu locker und zu streng zugleich: `variant` akzeptiert jeden String, und jedes Feld ist Pflicht. Du schreibst einen Vertrag, der Tippfehler findet und nur verlangt, was wirklich nötig ist.

Lektion: **JSX ist JavaScript, Props sind der Vertrag** (`react-jsx-props`)

```bash
npm install
npm run dev
npm test
npm run typecheck
```

## Übung

1. Starte die App. Die zweite Karte sieht nicht kompakt aus – warum meldet TypeScript den Fehler nicht?
2. Typisiere `variant` in `src/CartItemCard.tsx` als Union Type `'default' | 'compact' | 'highlighted'`. Jetzt zeigt `npm run typecheck` den Tippfehler in `src/App.tsx`. Behebe ihn.
3. Mach `quantity`, `variant` und `note` optional. Setz Default-Werte direkt in der Destrukturierung: Menge 1, Variante `'default'`.
4. Entferne in `src/typeChecks.tsx` das `// ` am Anfang der auskommentierten Zeilen. `npm run typecheck` muss danach ohne Fehler laufen. Die Zeilen mit `@ts-expect-error` prüfen, dass falsche Aufrufe weiterhin scheitern.
5. Ergänze einen Test für die Menge 1 ohne Angabe.

## Lösung

`solution/CartItemCard.tsx`, `solution/typeChecks.tsx` und `solution/CartItemCard.test.tsx`. Um die Lösung im Browser zu sehen, ändere den Import in `src/main.tsx` auf `../solution/App`.
