# Effects

Ein Bestell-Panel mit vier `useEffect`. Nur einer davon synchronisiert wirklich mit einem externen System – und auch dem fehlt der Cleanup.

Lektion: **Brauchst du diesen Effect wirklich?** (`react-effects`)

```bash
npm install
npm run dev
npm test
```

## Übung

Prüfe jeden Effect in `src/OrderPanel.tsx` mit der Frage: Synchronisiert er mit etwas außerhalb von React?

1. **Effect 1** leitet `fullName` aus Props ab. Berechne den Wert beim Rendern und lösch State und Effect.
2. **Effect 4** reagiert auf einen Klick. Ruf `onReorder` direkt im Event Handler auf. Entferne `.skip` beim Test „bestellt bei jedem Klick erneut“ – er zeigt, warum der Effect falsch ist.
3. **Effect 3** startet ein Interval und räumt es nie auf. Gib eine Cleanup-Funktion zurück, die `clearInterval` aufruft.
4. **Effect 2** lädt Bestellungen. Klick in der App schnell auf „Nächster Kunde“: Eine langsame alte Antwort überschreibt die neue. Gib dem Request einen `AbortController` mit und setz den State nur, solange das Signal nicht abgebrochen ist.
5. Entferne alle `.skip` in `src/OrderPanel.test.tsx`.

Tipp: `<StrictMode>` in `src/main.tsx` mountet jede Component in der Entwicklung zweimal. Fehlende Cleanups fallen dadurch früher auf.

## Lösung

`solution/OrderPanel.tsx` mit Tests in `solution/OrderPanel.test.tsx`. Ein Effect bleibt übrig – der Request mit Abort.
