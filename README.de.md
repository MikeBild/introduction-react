*[English](README.md) · Deutsch*

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
| 1 | 1 | Components als Funktionen denken | `react-components` | [examples/basic-app](examples/basic-app/README.de.md) |
| 1 | 1 | JSX ist JavaScript, Props sind der Vertrag | `react-jsx-props` | [examples/jsx-props](examples/jsx-props/README.de.md) · [Kapitel](react-typescript.de.md) |
| 1 | 1 | Inhalte hineingeben statt Flags sammeln | `react-composition` | [examples/component-library](examples/component-library/README.de.md) · [Kapitel](6-extended.de.md) |
| 1 | 1 | Styles gehören zur Component | `react-styling` | [examples/styling-tailwind](examples/styling-tailwind/README.de.md) · [Kapitel](7-css.de.md) |
| 1 | 1 | State ist ein Snapshot pro Render | `react-state-hooks` | [examples/basic-app](examples/basic-app/README.de.md) |
| 1 | 1 | Wem gehört der Wert im Input? | `react-events-forms` | [examples/events-forms](examples/events-forms/README.de.md) · [Kapitel](5-event-bindings.de.md) |
| 1 | 1 | Keys sind Identität, nicht Position | `react-lists-conditions` | [examples/lists-conditions](examples/lists-conditions/README.de.md) · [Kapitel](3-jsx.de.md) |
| 1 | 1 | Brauchst du diesen Effect wirklich? | `react-effects` | [examples/effects](examples/effects/README.de.md) · [Kapitel](21-hooks.de.md) |
| 2 | 2 | Custom Hooks teilen Verhalten, nicht State | `react-custom-hooks` | [examples/custom-hooks](examples/custom-hooks/README.de.md) · [Kapitel](21-hooks.de.md) |
| 2 | 2 | Context ist kein Store für alles | `react-context-state` | [examples/context-state](examples/context-state/README.de.md) · [Kapitel](6-extended.de.md) |
| 2 | 2 | Unmögliche States mit useReducer verhindern | `react-reducer` | [examples/reducer-state-machine](examples/reducer-state-machine/README.de.md) |
| 2 | 2 | Alte Antworten dürfen neue nicht überholen | `react-data-fetching` | [examples/data-fetching](examples/data-fetching/README.de.md) · [Kapitel](8-server-access.de.md) |
| 2 | 2 | Wo wird gewartet, wo werden Errors gefangen? | `react-suspense-errors` | [examples/suspense-errors](examples/suspense-errors/README.de.md) · [Kapitel](18-more-pattern.de.md) |
| 2 | 2 | Die URL ist State, den du teilen kannst | `react-routing` | [examples/router-app](examples/router-app/README.de.md) |
| 2 | 2 | Ein Schema für Form, Server und Typ | `react-forms-validation` | [examples/forms-validation](examples/forms-validation/README.de.md) |
| 3 | 2 | Accessibility von Anfang an | `react-accessibility` | [examples/accessible-components](examples/accessible-components/README.de.md) |
| 3 | 2 | Teste, was Nutzende sehen und tun | `react-testing` | [examples/testing](examples/testing/README.de.md) · [Kapitel](10-testing.de.md) |
| 3 | 2 | Atomic Design gibt dem Team ein Vokabular | `react-atomic-design` | [examples/component-library](examples/component-library/README.de.md) |
| 3 | 3 | Generics bewahren den Typ des Aufrufers | `react-generic-components` | [examples/generic-components](examples/generic-components/README.de.md) · [Kapitel](react-typescript.de.md) |
| 3 | 3 | Nach Features ordnen, Boundaries prüfen | `react-architecture` | [examples/feature-architecture](examples/feature-architecture/README.de.md) |
| 3 | 3 | Erst messen, dann optimieren | `react-rendering-performance` | [examples/rendering-performance](examples/rendering-performance/README.de.md) · [Kapitel](21-hooks.de.md) |
| 3 | 3 | Optimistic UI braucht einen Rückweg | `react-actions-optimistic` | [examples/actions-optimistic](examples/actions-optimistic/README.de.md) |
| 3 | 3 | Produktion beginnt beim Build | `react-production` | [examples/production-build](examples/production-build/README.de.md) |

### Zusatzkapitel (optional)

Diese Lektionen gehören nicht zum Kern. Die meisten bringen eigene Pakete mit, die im Kern bewusst fehlen.

| Lektion | ID | Übung |
|---|---|---|
| Vite startet dein Projekt in Sekunden | `react-vite-setup` | [examples/vite-setup](examples/vite-setup/README.de.md) |
| Jede Story zeigt einen Zustand | `react-storybook` | [examples/forms-validation](examples/forms-validation/README.de.md) |
| Wohin mit dem Build? | `react-deployment` | [examples/production-build](examples/production-build/README.de.md) |
| Eine PWA läuft auch ohne Netz | `react-pwa` | [examples/production-build](examples/production-build/README.de.md) |
| Wann lohnt sich TanStack Query? | `react-tanstack-query` | [examples/tanstack-query](examples/tanstack-query/README.de.md) · [Kapitel](8-server-access.de.md) |
| Wann lohnt sich RxJS in React? | `react-rxjs` | [examples/rxjs](examples/rxjs/README.de.md) |
| GraphQL mit Apollo Client | `graphql-why`, `graphql-schema-design`, `graphql-react-client` | [introduction-graphql](https://github.com/MikeBild/introduction-graphql) |
| Wann lohnen sich Server Components? | `react-server-components` | [examples/ssr-app](examples/ssr-app/README.de.md) |
| E2E-Tests sichern die wichtigsten Wege | `react-e2e-playwright` | [examples/e2e](examples/e2e/README.de.md) |

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

- Workshop: [„Fullstack mit TypeScript, Node.js, GraphQL und React in 6 Tagen“](https://workshops.mikebild.dev/w/fullstack/onsite/)
- Workshop: [„React mit Vite bis zur installierbaren PWA“](https://workshops.mikebild.dev/w/react-fortgeschritten/remote/)
- Workshop: [„React mit TypeScript bis zur Produktion“](https://workshops.mikebild.dev/w/react/remote/)
- Folien: [slides.mikebild.dev/introduction-react](https://slides.mikebild.dev/introduction-react.html)
- PDF: [introduction-react.pdf](https://media.mikebild.dev/site/mikebild/decks/introduction-react/introduction-react.pdf)
- Video: [introduction-react.mp4](https://media.mikebild.dev/site/mikebild/decks/introduction-react/introduction-react.mp4)
- Beiträge auf mikebild.dev:
  - [React-Überblick: Von JSX zur Komponentenarchitektur](https://www.mikebild.dev/de/blog/react-ueberblick-von-jsx-zur-architektur/)

## Archiv

Kapitel, Beispiele und Folien aus den Jahren 2017 bis 2023 (Class Components, Redux, webpack, Next.js Pages Router, React 16 bis 18) liegen unter [archive/](archive/README.md) und [slides/](slides/).

## Fehler melden

Hast du einen Fehler gefunden oder eine Idee? Leg ein [Issue](https://github.com/MikeBild/introduction-react/issues) an. Sicherheitslücken meldest du bitte nicht öffentlich, sondern über das Kontaktformular auf [mikebild.dev](https://www.mikebild.dev).

## Lizenz

[MIT](LICENSE)
