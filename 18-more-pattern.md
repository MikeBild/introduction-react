*English · [Deutsch](18-more-pattern.de.md)*

# Suspense and Error Boundaries

Two questions shape the structure of a page: Where do you wait? Where are errors caught? `Suspense` answers the first, an Error Boundary the second.

```tsx
import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary FallbackComponent={OrderError} onReset={retryOrder}>
  <Suspense fallback={<p>Bestellung wird geladen …</p>}>
    <OrderDetails orderPromise={orderPromise} />
  </Suspense>
</ErrorBoundary>;
```

## Rules

- Do not write your own Error Boundary class anymore. [react-error-boundary](https://github.com/bvaughn/react-error-boundary) encapsulates the only place where React still requires a class.
- Create the promise for `use()` outside of render and cache it. A new promise per render loads forever.
- Never put `use()` in `try/catch`. The boundary catches errors.
- Place boundaries where a part of the page may fail independently.

Render props, Higher-Order Components, and custom Error Boundary classes are in the earlier version of this chapter.

## Exercise

Lesson **Where do you wait, where are errors caught?** (`react-suspense-errors`): [examples/suspense-errors](examples/suspense-errors/README.md)

The earlier version of this chapter is in [archive/chapters/18-more-pattern.md](archive/chapters/18-more-pattern.md).
