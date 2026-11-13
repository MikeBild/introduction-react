*English · [Deutsch](README.de.md)*

# Exercises: React

Exercise repo for the workshop “React with TypeScript all the way to production”. Every lesson – 23 in the core, plus the extra chapters – comes with a runnable example: starter code (`src/`), tests, and a reference solution (`solution/`). All exercises take place in the workshop shop with products, cart, checkout, and orders.

## What you learn

- Build components, state, effects, and forms with TypeScript strict
- Load data, catch errors, route, and validate with a schema
- Take apps to production: accessible, tested, and performant

## Prerequisites

- **Node.js 26** – `nvm use` reads the version from [`.nvmrc`](.nvmrc).
- npm 11
- An editor with TypeScript support, for example VS Code
- Chrome or Firefox with the [React DevTools](https://react.dev/learn/react-developer-tools)

## Setup

```bash
git clone https://github.com/MikeBild/introduction-react.git
cd introduction-react
nvm use
./scripts/check-all.sh              # check all examples
./scripts/check-all.sh ssr-app      # only one
```

For each example the script runs `npm ci`, `typecheck`, `test`, and `build`, plus the build of the reference solution and of Storybook where they exist.

## How to work on an exercise

Each example under `examples/` is its own project. Install the dependencies in the example’s folder, not in the repo root:

```bash
cd examples/basic-app
npm install
npm run dev        # app in the browser
npm test           # Vitest once
npm run test:watch # Vitest in watch mode
npm run typecheck  # TypeScript strict
npm run build      # type check and production build
```

The README in each example describes the exercise step by step. Tests you turn green during the exercise are marked with `it.skip`. In `solution/` you find a reference solution with tests.

## Exercises

### Core (3 days)

The order follows the agenda and goes from easy to hard. The level shows the difficulty: 1 fundamentals, 2 advanced, 3 production topics.

| Day | Level | Lesson | ID | Exercise |
|---|---|---|---|---|
| 1 | 1 | Thinking of components as functions | `react-components` | [examples/basic-app](examples/basic-app/README.md) |
| 1 | 1 | JSX is JavaScript, props are the contract | `react-jsx-props` | [examples/jsx-props](examples/jsx-props/README.md) · [Chapter](react-typescript.md) |
| 1 | 1 | Pass content in instead of collecting flags | `react-composition` | [examples/component-library](examples/component-library/README.md) · [Chapter](6-extended.md) |
| 1 | 1 | Styles belong with the component | `react-styling` | [examples/styling-tailwind](examples/styling-tailwind/README.md) · [Chapter](7-css.md) |
| 1 | 1 | State is a snapshot per render | `react-state-hooks` | [examples/basic-app](examples/basic-app/README.md) |
| 1 | 1 | Who owns the value in the input? | `react-events-forms` | [examples/events-forms](examples/events-forms/README.md) · [Chapter](5-event-bindings.md) |
| 1 | 1 | Keys are identity, not position | `react-lists-conditions` | [examples/lists-conditions](examples/lists-conditions/README.md) · [Chapter](3-jsx.md) |
| 1 | 1 | Do you really need this effect? | `react-effects` | [examples/effects](examples/effects/README.md) · [Chapter](21-hooks.md) |
| 2 | 2 | Custom hooks share behavior, not state | `react-custom-hooks` | [examples/custom-hooks](examples/custom-hooks/README.md) · [Chapter](21-hooks.md) |
| 2 | 2 | Context is not a store for everything | `react-context-state` | [examples/context-state](examples/context-state/README.md) · [Chapter](6-extended.md) |
| 2 | 2 | Prevent impossible states with useReducer | `react-reducer` | [examples/reducer-state-machine](examples/reducer-state-machine/README.md) |
| 2 | 2 | Old answers must not overtake new ones | `react-data-fetching` | [examples/data-fetching](examples/data-fetching/README.md) · [Chapter](8-server-access.md) |
| 2 | 2 | Where do you wait, where are errors caught? | `react-suspense-errors` | [examples/suspense-errors](examples/suspense-errors/README.md) · [Chapter](18-more-pattern.md) |
| 2 | 2 | The URL is state you can share | `react-routing` | [examples/router-app](examples/router-app/README.md) |
| 2 | 2 | One schema for form, server, and type | `react-forms-validation` | [examples/forms-validation](examples/forms-validation/README.md) |
| 3 | 2 | Accessibility from the start | `react-accessibility` | [examples/accessible-components](examples/accessible-components/README.md) |
| 3 | 2 | Test what users see and do | `react-testing` | [examples/testing](examples/testing/README.md) · [Chapter](10-testing.md) |
| 3 | 2 | Atomic Design gives the team a vocabulary | `react-atomic-design` | [examples/component-library](examples/component-library/README.md) |
| 3 | 3 | Generics preserve the caller’s type | `react-generic-components` | [examples/generic-components](examples/generic-components/README.md) · [Chapter](react-typescript.md) |
| 3 | 3 | Organize by feature, verify boundaries | `react-architecture` | [examples/feature-architecture](examples/feature-architecture/README.md) |
| 3 | 3 | Measure first, then optimize | `react-rendering-performance` | [examples/rendering-performance](examples/rendering-performance/README.md) · [Chapter](21-hooks.md) |
| 3 | 3 | Optimistic UI needs a way back | `react-actions-optimistic` | [examples/actions-optimistic](examples/actions-optimistic/README.md) |
| 3 | 3 | Production starts with the build | `react-production` | [examples/production-build](examples/production-build/README.md) |

### Extra chapters (optional)

These lessons are not part of the core. Most of them bring their own packages, which the core deliberately leaves out.

| Lesson | ID | Exercise |
|---|---|---|
| Vite starts your project in seconds | `react-vite-setup` | [examples/vite-setup](examples/vite-setup/README.md) |
| Every story shows one state | `react-storybook` | [examples/forms-validation](examples/forms-validation/README.md) |
| Where should the build go? | `react-deployment` | [examples/production-build](examples/production-build/README.md) |
| A PWA also runs without a network | `react-pwa` | [examples/production-build](examples/production-build/README.md) |
| When is TanStack Query worth it? | `react-tanstack-query` | [examples/tanstack-query](examples/tanstack-query/README.md) · [Chapter](8-server-access.md) |
| When is RxJS worth it in React? | `react-rxjs` | [examples/rxjs](examples/rxjs/README.md) |
| GraphQL with Apollo Client | `graphql-why`, `graphql-schema-design`, `graphql-react-client` | [introduction-graphql](https://github.com/MikeBild/introduction-graphql) |
| When are server components worth it? | `react-server-components` | [examples/ssr-app](examples/ssr-app/README.md) |
| E2E tests protect the most important paths | `react-e2e-playwright` | [examples/e2e](examples/e2e/README.md) |

## The workshop shop

Types and sample data live in each example under `src/shop.ts`, money always in whole cents. The checkout validates with the shared schema `PlaceOrderInput`.

## Stack

As few packages as possible. Every example uses React 19.3 with the [React Compiler](https://react.dev/learn/react-compiler), TypeScript strict, Vite 8, and Vitest 5 with Testing Library. Further packages are added only where the exercise needs them:

- [React Router 8](https://reactrouter.com) in `router-app`
- [zod 4](https://zod.dev) for form validation in `forms-validation` and `testing`
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary) in `suspense-errors` and `production-build`
- [Tailwind CSS 4](https://tailwindcss.com) in `styling-tailwind`
- [Storybook 10](https://storybook.js.org) in `component-library`
- [TanStack Query 5](https://tanstack.com/query) only in the extra chapter `tanstack-query`
- [RxJS](https://rxjs.dev) only in the extra chapter `rxjs`
- [Express 5](https://expressjs.com) for the servers in `ssr-app`, `production-build`, and `e2e`
- [Playwright](https://playwright.dev) for the end-to-end tests in the extra chapter `e2e`; the browser comes via `npx playwright install chromium`

In the core you load data with `fetch` and your own hook (`data-fetching`), then with `use` and `Suspense` (`suspense-errors`), without a data-fetching library. Class components only remain in the archive.

## Workshop and slides

- Workshop (held in German): [“Full-stack with TypeScript, Node.js, GraphQL, and React in 6 days”](https://workshops.mikebild.dev/w/fullstack/onsite/)
- Workshop (held in German): [“React with Vite to an installable PWA”](https://workshops.mikebild.dev/w/react-fortgeschritten/remote/)
- Workshop (held in German): [“React with TypeScript all the way to production”](https://workshops.mikebild.dev/w/react/remote/)
- Slides: [slides.mikebild.dev/introduction-react.en](https://slides.mikebild.dev/introduction-react.en.html)
- PDF: [introduction-react.en.pdf](https://media.mikebild.dev/site/mikebild/decks/introduction-react/introduction-react.en.pdf)
- Video: [introduction-react.en.mp4](https://media.mikebild.dev/site/mikebild/decks/introduction-react/introduction-react.en.mp4)
- Posts on mikebild.dev:
  - [React Overview: From JSX to Component Architecture](https://www.mikebild.dev/en/blog/react-overview-from-jsx-to-component-architecture/)

## Archive

Chapters, examples, and slides from 2017 to 2023 (class components, Redux, webpack, Next.js Pages Router, React 16 to 18) are in [archive/](archive/README.md) and [slides/](slides/).

## Report a bug

Found a bug or have an idea? Open an [issue](https://github.com/MikeBild/introduction-react/issues). Please do not report security issues publicly; use the contact form on [mikebild.dev](https://www.mikebild.dev) instead.

## License

[MIT](LICENSE)
