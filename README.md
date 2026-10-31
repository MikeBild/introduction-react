# Übungen: React

Übungs-Repo zum Workshop „React mit TypeScript bis zur Produktion“. Zu jeder Lektion – 23 im Kern, dazu die Zusatzkapitel – gibt es ein lauffähiges Beispiel mit Startpunkt (`src/`), Tests und Lösung (`solution/`). Alle Übungen spielen im Werkstatt-Shop mit Produkten, Warenkorb, Checkout und Bestellungen.

## Was du lernst

- Components, State, Effects und Forms mit TypeScript strict bauen
- Daten laden, Fehler abfangen, routen und mit einem Schema validieren
- Apps zugänglich, getestet und performant in die Produktion bringen

## Voraussetzungen

- **Node.js 26** – `nvm use` liest die Version aus [`.nvmrc`](.nvmrc).
- npm 11
- Ein Editor mit TypeScript-Support, zum Beispiel VS Code
- Chrome oder Firefox mit den [React DevTools](https://react.dev/learn/react-developer-tools)

## Einrichten

```bash
git clone https://github.com/MikeBild/introduction-react.git
cd introduction-react
nvm use
./scripts/check-all.sh              # alle Beispiele prüfen
./scripts/check-all.sh ssr-app      # nur eins
```

Das Script führt je Beispiel `npm ci`, `typecheck`, `test` und `build` aus, dazu den Build der Lösung und von Storybook, wo es sie gibt.

## So arbeitest du mit einer Übung

Jedes Beispiel unter `examples/` ist ein eigenes Projekt. Installiere die Abhängigkeiten im Ordner des Beispiels, nicht im Hauptverzeichnis:

```bash
cd examples/basic-app
npm install
npm run dev        # App im Browser
npm test           # Vitest einmal
npm run test:watch # Vitest im Watch Mode
npm run typecheck  # TypeScript strict
npm run build      # Type Check und Build für die Produktion
```

Die README im Beispiel beschreibt die Übung Schritt für Schritt. Tests, die du im Lauf der Übung grün machst, sind mit `it.skip` markiert. In `solution/` findest du eine mögliche Lösung samt Tests.

## Übungen

### Kern (3 Tage)

Die Reihenfolge folgt der Agenda und geht von einfach nach schwer. Die Stufe zeigt den Schwierigkeitsgrad: 1 Grundlagen, 2 Fortgeschritten, 3 Themen für die Produktion.

| Tag | Stufe | Lektion | ID | Übung |
|---|---|---|---|---|
| 1 | 1 | Components als Funktionen denken | `react-components` | [examples/basic-app](examples/basic-app/README.md) |
| 1 | 1 | JSX ist JavaScript, Props sind der Vertrag | `react-jsx-props` | [examples/jsx-props](examples/jsx-props/README.md) · [Kapitel](react-typescript.md) |
| 1 | 1 | Inhalte hineingeben statt Flags sammeln | `react-composition` | [examples/component-library](examples/component-library/README.md) · [Kapitel](6-extended.md) |
| 1 | 1 | Styles gehören zur Component | `react-styling` | [examples/styling-tailwind](examples/styling-tailwind/README.md) · [Kapitel](7-css.md) |
| 1 | 1 | State ist ein Snapshot pro Render | `react-state-hooks` | [examples/basic-app](examples/basic-app/README.md) |
| 1 | 1 | Wem gehört der Wert im Input? | `react-events-forms` | [examples/events-forms](examples/events-forms/README.md) · [Kapitel](5-event-bindings.md) |
| 1 | 1 | Keys sind Identität, nicht Position | `react-lists-conditions` | [examples/lists-conditions](examples/lists-conditions/README.md) · [Kapitel](3-jsx.md) |
| 1 | 1 | Brauchst du diesen Effect wirklich? | `react-effects` | [examples/effects](examples/effects/README.md) · [Kapitel](21-hooks.md) |
| 2 | 2 | Custom Hooks teilen Verhalten, nicht State | `react-custom-hooks` | [examples/custom-hooks](examples/custom-hooks/README.md) · [Kapitel](21-hooks.md) |
| 2 | 2 | Context ist kein Store für alles | `react-context-state` | [examples/context-state](examples/context-state/README.md) · [Kapitel](6-extended.md) |
| 2 | 2 | Unmögliche States mit useReducer verhindern | `react-reducer` | [examples/reducer-state-machine](examples/reducer-state-machine/README.md) |
| 2 | 2 | Alte Antworten dürfen neue nicht überholen | `react-data-fetching` | [examples/data-fetching](examples/data-fetching/README.md) · [Kapitel](8-server-access.md) |
| 2 | 2 | Wo wird gewartet, wo werden Errors gefangen? | `react-suspense-errors` | [examples/suspense-errors](examples/suspense-errors/README.md) · [Kapitel](18-more-pattern.md) |
| 2 | 2 | Die URL ist State, den du teilen kannst | `react-routing` | [examples/router-app](examples/router-app/README.md) |
| 2 | 2 | Ein Schema für Form, Server und Typ | `react-forms-validation` | [examples/forms-validation](examples/forms-validation/README.md) |
| 3 | 2 | Accessibility von Anfang an | `react-accessibility` | [examples/accessible-components](examples/accessible-components/README.md) |
| 3 | 2 | Teste, was Nutzende sehen und tun | `react-testing` | [examples/testing](examples/testing/README.md) · [Kapitel](10-testing.md) |
| 3 | 2 | Atomic Design gibt dem Team ein Vokabular | `react-atomic-design` | [examples/component-library](examples/component-library/README.md) |
| 3 | 3 | Generics bewahren den Typ des Aufrufers | `react-generic-components` | [examples/generic-components](examples/generic-components/README.md) · [Kapitel](react-typescript.md) |
| 3 | 3 | Nach Features ordnen, Boundaries prüfen | `react-architecture` | [examples/feature-architecture](examples/feature-architecture/README.md) |
| 3 | 3 | Erst messen, dann optimieren | `react-rendering-performance` | [examples/rendering-performance](examples/rendering-performance/README.md) · [Kapitel](21-hooks.md) |
| 3 | 3 | Optimistic UI braucht einen Rückweg | `react-actions-optimistic` | [examples/actions-optimistic](examples/actions-optimistic/README.md) |
| 3 | 3 | Produktion beginnt beim Build | `react-production` | [examples/production-build](examples/production-build/README.md) |

### Zusatzkapitel (optional)

Diese Lektionen gehören nicht zum Kern. Die meisten bringen eigene Pakete mit, die im Kern bewusst fehlen.

| Lektion | ID | Übung |
|---|---|---|
| Vite startet dein Projekt in Sekunden | `react-vite-setup` | [examples/vite-setup](examples/vite-setup/README.md) |
| Jede Story zeigt einen Zustand | `react-storybook` | [examples/forms-validation](examples/forms-validation/README.md) |
| Wohin mit dem Build? | `react-deployment` | [examples/production-build](examples/production-build/README.md) |
| Eine PWA läuft auch ohne Netz | `react-pwa` | [examples/production-build](examples/production-build/README.md) |
| Wann lohnt sich TanStack Query? | `react-tanstack-query` | [examples/tanstack-query](examples/tanstack-query/README.md) · [Kapitel](8-server-access.md) |
| Wann lohnt sich RxJS in React? | `react-rxjs` | [examples/rxjs](examples/rxjs/README.md) |
| GraphQL mit Apollo Client | `graphql-why`, `graphql-schema-design`, `graphql-react-client` | [introduction-graphql](https://github.com/MikeBild/introduction-graphql) |
| Wann lohnen sich Server Components? | `react-server-components` | [examples/ssr-app](examples/ssr-app/README.md) |
| E2E-Tests sichern die wichtigsten Wege | `react-e2e-playwright` | [examples/e2e](examples/e2e/README.md) |

## Der Werkstatt-Shop

Typen und Beispieldaten liegen in jedem Beispiel unter `src/shop.ts`, Geld immer in ganzen Cent. Der Checkout validiert mit dem gemeinsamen Schema `PlaceOrderInput`.

## Stack

So wenig Pakete wie möglich. Jedes Beispiel nutzt React 19.3 mit [React Compiler](https://react.dev/learn/react-compiler), TypeScript strict, Vite 8 sowie Vitest 5 mit Testing Library. Weitere Pakete kommen nur dort dazu, wo die Übung sie braucht:

- [React Router 8](https://reactrouter.com) in `router-app`
- [zod 4](https://zod.dev) für Formular-Validierung in `forms-validation` und `testing`
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary) in `suspense-errors` und `production-build`
- [Tailwind CSS 4](https://tailwindcss.com) in `styling-tailwind`
- [Storybook 10](https://storybook.js.org) in `component-library`
- [TanStack Query 5](https://tanstack.com/query) nur im Zusatzkapitel `tanstack-query`
- [RxJS](https://rxjs.dev) nur im Zusatzkapitel `rxjs`
- [Express 5](https://expressjs.com) für die Server in `ssr-app`, `production-build` und `e2e`
- [Playwright](https://playwright.dev) für die End-to-End-Tests im Zusatzkapitel `e2e`; der Browser kommt per `npx playwright install chromium`

Daten lädst du im Kern mit `fetch` und einem eigenen Hook (`data-fetching`), danach mit `use` und `Suspense` (`suspense-errors`), ohne Data-Fetching-Library. Class Components gibt es nur noch im Archiv.

## Workshop und Folien

- Workshop: [„React mit TypeScript bis zur Produktion“](https://workshops.mikebild.dev/w/react/remote/)
- Workshop: [„React mit Vite bis zur installierbaren PWA“](https://workshops.mikebild.dev/w/react-fortgeschritten/remote/)
- Workshop: [„Fullstack mit TypeScript, Node.js, GraphQL und React in 6 Tagen“](https://workshops.mikebild.dev/w/fullstack/onsite/)
- Folien: [slides.mikebild.dev/introduction-react](https://slides.mikebild.dev/introduction-react.html)

## Archiv

Kapitel, Beispiele und Folien aus den Jahren 2017 bis 2023 (Class Components, Redux, webpack, Next.js Pages Router, React 16 bis 18) liegen unter [legacy/](legacy/README.md) und [slides/](slides/).

## Fehler melden

Wenn du einen Fehler findest oder dir etwas fehlt, leg ein Issue in diesem Repository an. Sicherheitslücken meldest du bitte nicht über den öffentlichen [Issue-Tracker](https://github.com/MikeBild/introduction-react/issues).

## Lizenz

[MIT](LICENSE)
