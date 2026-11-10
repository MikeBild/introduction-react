*English · [Deutsch](README.de.md)*

# Component Library

The component library of the workshop shop with [Storybook](https://storybook.js.org). All components currently sit flat in `src/components/`, and the `CustomerCard` collects another flag for every new requirement. You rebuild it with slots and organize the library by Atomic Design.

Lessons: **Pass content in instead of collecting flags** (`react-composition`) and **Atomic Design gives the team a vocabulary** (`react-atomic-design`)

```bash
npm install
npm run storybook   # Storybook at http://localhost:6006
npm run dev         # the example app
npm test
```

## Exercise 1 – Composition (`react-composition`)

1. Look at the stories for `CustomerCard` in Storybook. Each variant needs a different combination of flags.
2. Build a `Card` with three slots: `header`, `children`, and `actions`. The card renders an `article`, the header in `<header>`, and the actions in `<footer>`. If there are no actions, the footer is omitted.
3. Use it to build a customer overview: name and a badge with the number of orders in the header, the email as children, “Bearbeiten” (edit) and a `mailto:` link as actions.
4. Write stories for the card without a single flag. Remove the first `.skip` in `src/App.test.tsx`.

## Exercise 2 – Atomic Design (`react-atomic-design`)

1. Assign each component to a level: atom, molecule, organism. Create the folders `atoms/`, `molecules/`, and `organisms/` for them.
2. Build an organism `ProductResultList` with a notice for an empty result list.
3. Build a template `ProductSearchTemplate` for a product search. It takes slots for title, search field, result count, and results, and knows neither data nor state.
4. Fill the template in a page with state and data from `src/data/products.ts`. Show the result count as “2 Treffer” (2 results).
5. Give the stories titles by level, for example `Atomic Design/Templates/ProductSearchTemplate`. Remove the second `.skip` in `src/App.test.tsx`.

## Reference solution

- `solution/react-composition/` – `Card` with slots, `CustomerOverview`, tests, and stories
- `solution/react-atomic-design/` – `atoms/`, `molecules/`, `organisms/`, `templates/`, `pages/` with tests and stories
- `solution/App.tsx` – both together in the app

Storybook shows the starting point and the reference solution side by side: under “Startpunkt” (starting point) the current state, under “Composition” and “Atomic Design” the reference solution. For the app, change the import in `src/main.tsx` to `../solution/App`.

```bash
npm run build-storybook   # static Storybook into storybook-static/
```
