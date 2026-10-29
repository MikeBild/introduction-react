import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../src/AppErrorBoundary';
import type { ReportError } from './errorReporting';

type AppErrorBoundaryProps = {
  reportError: ReportError;
  children: ReactNode;
};

export const AppErrorBoundary = ({
  reportError,
  children,
}: AppErrorBoundaryProps) => (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onError={(error) => reportError(error, 'render')}
  >
    {children}
  </ErrorBoundary>
);
