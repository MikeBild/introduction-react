import { Component, type ReactNode } from 'react';

type ErrorBoundaryProps = {
  fallback: ReactNode;
  onError?: (error: unknown) => void;
  children: ReactNode;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError = () => ({ hasError: true });

  componentDidCatch(error: unknown) {
    this.props.onError?.(error);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
