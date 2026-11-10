*English · [Deutsch](21-hooks.de.md)*

# Hooks

Hooks give Functional Components state, effects, and shared behavior. They follow two rules: call them only at the top level of a component or a Custom Hook, never inside conditions or loops.

## useEffect – do you really need it?

An effect synchronizes your component with something outside of React: a timer, a subscription, a request. For everything else you do not need it.

- Compute derived values during render.
- Reactions to a click belong in the event handler.
- Every effect that starts something returns a cleanup function.

Exercise: lesson **Do you really need this effect?** (`react-effects`) – [examples/effects](examples/effects/README.md)

## Custom Hooks

A Custom Hook shares behavior, not state. Two components that use the same hook each have their own state.

```ts
export const useDebouncedValue = <T,>(value: T, delayMs: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timeoutId);
  }, [value, delayMs]);
  return debouncedValue;
};
```

Exercise: lesson **Custom hooks share behavior, not state** (`react-custom-hooks`) – [examples/custom-hooks](examples/custom-hooks/README.md)

## Rendering performance

Measure first, then optimize. The React Compiler memoizes components and values at build time; it is active in all examples via `vite.config.ts`. You only need `memo`, `useMemo`, and `useCallback` where the profiler shows a problem.

- Measure with the profiler in the React DevTools or with `<Profiler onRender>`.
- Move state down into the component that needs it.
- Pass expensive parts in as `children`, then they do not re-render on a state change.

Exercise: lesson **Measure first, then optimize** (`react-rendering-performance`) – [examples/rendering-performance](examples/rendering-performance/README.md)
