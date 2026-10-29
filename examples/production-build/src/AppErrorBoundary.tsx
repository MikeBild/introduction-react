import type { ReactNode } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import type { ReportError } from './errorReporting';

export const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => (
  <div role="alert">
    <p>Something went wrong.</p>
    <button type="button" onClick={resetErrorBoundary}>
      Try again
    </button>
  </div>
);

type AppErrorBoundaryProps = {
  reportError: ReportError;
  children: ReactNode;
};

// Exercise: report render errors via the onError prop of ErrorBoundary.
export const AppErrorBoundary = ({ children }: AppErrorBoundaryProps) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
);
