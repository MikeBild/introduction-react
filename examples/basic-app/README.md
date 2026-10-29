# Basic App

Eine Produktliste, die heute noch aus einer einzigen Component besteht. Du zerlegst sie in kleine Function Components und ergänzt dann einen Filter mit `useState`.

Lektionen: **Components als Funktionen denken** (`react-components`) und **State ist ein Snapshot pro Render** (`react-state-hooks`).

```bash
npm install
npm run dev
npm test
```

## Übung 1 – Components (`react-components`)

1. Zerlege `App` in `src/App.tsx` in drei Function Components, zum Beispiel `ProductList`, `ProductCard` und `PriceTag`.
2. Beschreib die Props jeder Component mit einem `type`. Optionale Props bekommen einen Default-Wert in der Destrukturierung, nicht `defaultProps`.
3. Lass `npm test` laufen. Der bestehende Test muss grün bleiben, denn die Oberfläche ändert sich nicht.

## Übung 2 – State (`react-state-hooks`)

1. Ergänze ein Suchfeld mit dem Label „Suche“. Der Suchtext ist der einzige State.
2. Berechne die gefilterte Liste beim Rendern aus `products` und dem Suchtext. Leg sie nicht in einen zweiten State.
3. Zeig „Keine Produkte für „…““, wenn nichts passt.
4. Entferne `.skip` in `src/App.test.tsx`.

## Lösung

- `solution/react-components/` – die zerlegte Liste mit Tests
- `solution/react-state-hooks/` – der Filter, aufgebaut auf Übung 1

Um eine Lösung im Browser zu sehen, ändere den Import in `src/main.tsx` auf `../solution/react-state-hooks/App`.
