# Component Library

Die Component Library des Werkstatt-Shops mit [Storybook](https://storybook.js.org). Alle Components liegen heute flach in `src/components/`, und die `CustomerCard` sammelt für jede neue Anforderung ein weiteres Flag. Du baust sie auf Slots um und ordnest die Library nach Atomic Design.

Lektionen: **Inhalte hineingeben statt Flags sammeln** (`react-composition`) und **Atomic Design gibt dem Team ein Vokabular** (`react-atomic-design`)

```bash
npm install
npm run storybook   # Storybook auf http://localhost:6006
npm run dev         # die Beispiel-App
npm test
```

## Übung 1 – Composition (`react-composition`)

1. Schau dir die Stories zu `CustomerCard` in Storybook an. Jede Variante braucht eine andere Kombination aus Flags.
2. Bau eine `Card` mit drei Slots: `header`, `children` und `actions`. Die Card rendert ein `article`, den Header in `<header>` und die Actions in `<footer>`. Fehlen die Actions, fällt der Footer weg.
3. Bau damit eine Kundenübersicht: Name und Badge mit der Zahl der Bestellungen in den Header, die E-Mail als Children, „Bearbeiten“ und einen `mailto:`-Link als Actions.
4. Schreib Stories für die Card, ohne ein einziges Flag. Entferne das erste `.skip` in `src/App.test.tsx`.

## Übung 2 – Atomic Design (`react-atomic-design`)

1. Ordne jede Component einer Stufe zu: Atom, Molecule, Organism. Leg dafür die Ordner `atoms/`, `molecules/` und `organisms/` an.
2. Bau ein Organism `ProductResultList` mit einem Hinweis für eine leere Trefferliste.
3. Bau ein Template `ProductSearchTemplate` für eine Produktsuche. Es nimmt Slots für Titel, Suchfeld, Trefferzahl und Ergebnisse und kennt weder Daten noch State.
4. Füll das Template in einer Page mit State und Daten aus `src/data/products.ts`. Zeig die Trefferzahl als „2 Treffer“.
5. Gib den Stories Titel nach Stufe, zum Beispiel `Atomic Design/Templates/ProductSearchTemplate`. Entferne das zweite `.skip` in `src/App.test.tsx`.

## Lösung

- `solution/react-composition/` – `Card` mit Slots, `CustomerOverview`, Tests und Stories
- `solution/react-atomic-design/` – `atoms/`, `molecules/`, `organisms/`, `templates/`, `pages/` mit Tests und Stories
- `solution/App.tsx` – beides zusammen in der App

Storybook zeigt Startpunkt und Lösung nebeneinander: unter „Startpunkt“ den heutigen Stand, unter „Composition“ und „Atomic Design“ die Lösung. Für die App änderst du den Import in `src/main.tsx` auf `../solution/App`.

```bash
npm run build-storybook   # statisches Storybook nach storybook-static/
```
