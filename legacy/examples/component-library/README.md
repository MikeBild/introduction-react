# React-Components

* Building React-Components with [TypeScript](https://www.typescriptlang.org/)
* Monorepo using [Lerna](https://lernajs.io/) and [NPM Workspaces](https://NPMpkg.com/lang/en/docs/workspaces/)
* Use [Storybook](https://storybook.js.org/)

## Setup

1. `npm`
2. `npm run bootstrap` - Install dependencies
3. `npm run build` - Build all components
4. `npm dev` - Run storybook in development mode

## Deploy Storybook as WebSite

```bash
cd packages/storybook
npm run build
npm start
```