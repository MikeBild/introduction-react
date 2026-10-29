# Generic Components

Eine Kundenliste als Tabelle, fest verdrahtet auf den Typ `Customer`. Für Produkte bräuchtest du eine Kopie. Du baust stattdessen eine generische `DataTable<T>`, die den Typ des Aufrufers bewahrt.

Lektion: **Generics bewahren den Typ des Aufrufers** (`react-generic-components`)

```bash
npm install
npm run dev
npm test
npm run typecheck
```

## Übung

1. Leg `src/DataTable.tsx` an mit einer Component `DataTable<T>` und den Props `rows: readonly T[]`, `columns: readonly Column<T>[]` und `getRowKey: (row: T) => string`.
2. Definiere `Column<T>` als Union Type: Eine Spalte zeigt entweder ein Feld (`field: keyof T & string`) oder rendert selbst (`render: (row: T) => ReactNode`). Beide haben einen `header`.
3. Ersetze in `src/App.tsx` die `CustomerTable` durch `DataTable` mit Spalten für Name, E-Mail und Umsatz. Der Test in `src/App.test.tsx` muss grün bleiben.
4. Entferne in `src/typeChecks.tsx` das `// ` am Anfang der Zeilen. `npm run typecheck` muss ohne Fehler laufen: Dieselbe Tabelle funktioniert für Produkte, und ein falscher Feldname scheitert.
5. Prüf deinen Code: kein `any`, kein `as`. Tipp: In einer `.tsx`-Datei schreibst du eine generische Arrow Function als `<T,>(…) =>`.

## Lösung

`solution/DataTable.tsx`, `solution/App.tsx`, `solution/typeChecks.tsx` und `solution/DataTable.test.tsx`. Um die Lösung im Browser zu sehen, ändere den Import in `src/main.tsx` auf `../solution/App`.
