# Testing React-Application

## Goods and Bads

![Test Pyramid](test-pyramid.png)

## Classifications

![Test Classifications](test-classifications.png)

## Setup

- [Vitest](https://vitest.dev)
- [Vitest API](https://vitest.dev/api/)
- [React testing library](https://testing-library.com)

```bash
npm install -D vitest jsdom @vitejs/plugin-react @testing-library/react @testing-library/jest-dom
```


## `package.json`

```json
"scripts": {
  "test": "vitest",
}
```

## `vite.config.ts`

```
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/tests/setup.js',
  },
});
```

## `tests/setup.js`
```
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
```

## Running tests

```bash
npm test
```

## Implementing tests

- Follow Arrange, Act, Assert (AAA)
- Consider the [Test-Pyramid](https://martinfowler.com/bliki/TestPyramid.html)

```javascript
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

describe("App", () => {
  it("renders headline", () => {
    render(<Header />);

    screen.debug();
  });
});

describe("Example", () => {
  it("1 should be 1", () => {
    expect(1).toEqual(1);
  });
});

```

## Testing React

- [Mocha + Enzyme React Basic App](examples/basic-app/test/Body.spec.js)

## Examples

- [Basic App](examples/basic-app/README.md)
- [Redux App](examples/redux-app/README.md)
