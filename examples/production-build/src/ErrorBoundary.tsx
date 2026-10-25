import { Component, type ReactNode } from 'react';

type ErrorBoundaryProps = {
  fallback: ReactNode;
  onError?: (error: unknown) => void;
  children: ReactNode;
};

// Error boundaries still need a class component.
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError = () => ({ hasError: true });

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
