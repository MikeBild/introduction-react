# Actions Optimistic

Der Warenkorb des Werkstatt-Shops mit einer Form Action aus React 19 und `useActionState`. Der Fake-Server braucht eine Sekunde und lehnt Positionen ab, für die der Bestand nicht reicht – bereit für `useOptimistic`.

Lektion: **Optimistic UI braucht einen Rückweg** (`react-actions-optimistic`)

```bash
npm install
npm run dev
npm test
```

## Übung

1. Verschieb den Submit-Button in eine eigene Component `SubmitButton` und lies dort den Pending State mit `useFormStatus` aus `react-dom`.
2. Zeig eine neue Position in `src/Cart.tsx` sofort mit `useOptimistic` an, ausgegraut, solange der Server speichert. `mergeItem` aus `src/cartApi.ts` hilft dir beim Zusammenfassen gleicher Produkte.
3. Leg den Steckschlüsselsatz in den Warenkorb: Er ist ausverkauft. Die optimistische Position verschwindet, und die Meldung erscheint.
4. Entferne `.skip` in `src/Cart.test.tsx`.

Optimistic Updates passen hier, weil eine Position im Entwurf fast immer gespeichert wird. Für das Bezahlen würdest du darauf verzichten.

## Lösung

Eine mögliche Lösung liegt in `solution/`: `Cart.tsx`, `SubmitButton.tsx` und die Tests.
