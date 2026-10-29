# Basic App

Die Produktliste des Werkstatt-Shops, heute noch eine einzige Component. Du zerlegst sie in kleine Function Components und ergänzt dann einen Filter und einen Warenkorb mit `useState`.

Lektionen: **Components als Funktionen denken** (`react-components`) und **State ist ein Snapshot pro Render** (`react-state-hooks`).

```bash
npm install
npm run dev
npm test
```

Die Daten des Werkstatt-Shops liegen in `src/shop.ts`: `Product` mit `priceCents` und `stock`, `OrderItem` und die Hilfsfunktionen `formatCents` und `orderTotalCents`.

## Übung 1 – Components (`react-components`)

1. Zeichne den Component Tree der Seite.
2. Zerlege `App` in `src/App.tsx` in drei Function Components: `ProductList`, `ProductCard` und `PriceTag`.
3. Beschreib die Props jeder Component mit einem `type`, zum Beispiel `type ProductCardProps = { name: string; priceCents: number; stock: number }`.
4. Lass `npm test` laufen. Der bestehende Test bleibt grün, denn die Oberfläche ändert sich nicht.

## Übung 2 – State (`react-state-hooks`)

1. Ergänze ein Suchfeld mit dem Label „Suche“. Der Suchtext ist State.
2. Berechne die gefilterte Liste beim Rendern. Leg sie nicht in einen zweiten State.
3. Zeig „Keine Produkte für „…““, wenn nichts passt.
4. Baue einen Warenkorb: Die Positionen (`OrderItem[]`) sind State, jede Produktkarte bekommt einen Button „… in den Warenkorb“, jede Position einen Button „… entfernen“.
5. Berechne die Summe mit `orderTotalCents` beim Rendern und zeig sie als „Summe: …“ in einem Bereich mit `aria-label="Warenkorb"`.
6. Erzeuge bei jedem Update ein neues Array (Spread, `map`, `filter`), nie `push`.
7. Entferne `.skip` in `src/App.test.tsx`.

## Lösung

- `solution/react-components/` – die zerlegte Liste mit Tests
- `solution/react-state-hooks/` – Filter und Warenkorb, aufgebaut auf Übung 1

Um eine Lösung im Browser zu sehen, ändere den Import in `src/main.tsx` auf `../solution/react-state-hooks/App`.
