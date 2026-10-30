# Hooks

Hooks geben Functional Components State, Effects und geteiltes Verhalten. Sie folgen zwei Regeln: Ruf sie nur auf oberster Ebene einer Component oder eines Custom Hooks auf, nie in Bedingungen oder Schleifen.

## useEffect – brauchst du ihn wirklich?

Ein Effect synchronisiert deine Component mit etwas außerhalb von React: einem Timer, einer Subscription, einem Request. Für alles andere brauchst du ihn nicht.

- Abgeleitete Werte berechnest du beim Rendern.
- Reaktionen auf einen Klick gehören in den Event Handler.
- Jeder Effect, der etwas startet, gibt eine Cleanup-Funktion zurück.

Übung: Lektion **Brauchst du diesen Effect wirklich?** (`react-effects`) – [examples/effects](examples/effects/README.md)

## Custom Hooks

Ein Custom Hook teilt Verhalten, nicht State. Zwei Components, die denselben Hook nutzen, haben jeweils ihren eigenen State.

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

Übung: Lektion **Custom Hooks teilen Verhalten, nicht State** (`react-custom-hooks`) – [examples/custom-hooks](examples/custom-hooks/README.md)

## Rendering Performance

Erst messen, dann optimieren. Der React Compiler memoisiert Components und Werte beim Build, in allen Beispielen ist er über `vite.config.ts` aktiv. `memo`, `useMemo` und `useCallback` brauchst du nur noch dort, wo der Profiler ein Problem zeigt.

- Miss mit dem Profiler der React DevTools oder mit `<Profiler onRender>`.
- Verschieb State nach unten, in die Component, die ihn braucht.
- Gib teure Teile als `children` hinein, dann rendern sie beim State-Wechsel nicht neu.

Übung: Lektion **Erst messen, dann optimieren** (`react-rendering-performance`) – [examples/rendering-performance](examples/rendering-performance/README.md)
