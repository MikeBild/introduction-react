# NextJS SPA

## Setup

```
npm install next@latest react@latest react-dom@latest
```

**`package.json`**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

**`next.config.js`**

```js
module.exports = {
  output: "export",
  distDir: "dist",
};
```

## Pages

**`/pages/_app.tsx`**

```
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

**`/pages/index.tsx`**

```
export default function Index() {
  return (
      <h1>Hello, Next.js!</h1>
      <a href="/demo">Demo Link</a>
  );
}
```

**`/pages/demo.tsx`**

```
export default function Demo() {
  return (
      <h1>Demo Mike!</h1>
      <a href="/">Index Link</a>
  );
}
```

## Develop SPA

`npm run dev`

## Build SPA

`npm run build`

## Run SPA (PROD)

`npm install http-server --save-dev`

**`package.json`**

```json
  "scripts": {
    "start": "http-server dist"
  },
```

`npm start`
