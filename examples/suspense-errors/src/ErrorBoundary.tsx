import { Component, type ReactNode } from 'react';

type ErrorBoundaryProps = { fallback: ReactNode; children: ReactNode };

// Legacy, wird in dieser Übung ersetzt: So sahen Error Boundaries aus, bevor es
// react-error-boundary gab. Kein Reset, kein Zugriff auf den Error im Fallback.
// Schreib keine neuen Class Components.
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
