# React-Components

* Building React-Components with [TypeScript](https://www.typescriptlang.org/)
* Monorepo using [Lerna](https://lernajs.io/) and [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/)
* Use [Storybook](https://storybook.js.org/)

## Setup

1. `yarn`
2. `yarn bootstrap` - Install dependencies
3. `yarn build` - Build all components
4. `yarn dev` - Run storybook in development mode

## Deploy Storybook as WebSite

```bash
cd packages/storybook
yarn build
yarn start
```