# Suspense und Error Boundaries

Zwei Fragen bestimmen die Struktur einer Seite: Wo wird gewartet? Wo werden Errors gefangen? `Suspense` beantwortet die erste, eine Error Boundary die zweite.

```tsx
import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary FallbackComponent={OrderError} onReset={retryOrder}>
  <Suspense fallback={<p>Bestellung wird geladen …</p>}>
    <OrderDetails orderPromise={orderPromise} />
  </Suspense>
</ErrorBoundary>;
```

## Regeln

- Schreib keine eigene Error-Boundary-Klasse mehr. [react-error-boundary](https://github.com/bvaughn/react-error-boundary) kapselt die einzige Stelle, an der React noch eine Klasse verlangt.
- Erzeuge das Promise für `use()` außerhalb des Renderns und cache es. Ein neues Promise pro Render lädt endlos.
- Leg `use()` nie in `try/catch`. Errors fängt die Boundary.
- Setz Boundaries dorthin, wo ein Teil der Seite unabhängig ausfallen darf.

Render Props, Higher-Order Components und eigene Error-Boundary-Klassen findest du in der alten Fassung dieses Kapitels.

## Übung

Lektion **Wo wird gewartet, wo werden Errors gefangen?** (`react-suspense-errors`): [examples/suspense-errors](examples/suspense-errors/README.md)

Die alte Fassung dieses Kapitels liegt unter [legacy/chapters/18-more-pattern.md](legacy/chapters/18-more-pattern.md).
