import type { ReactNode } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import type { ReportError } from './errorReporting';

export const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => (
  <div role="alert">
    <p>
      Dieser Bereich konnte nicht angezeigt werden. Versuch es noch einmal oder
      lade die Seite neu.
    </p>
    <button type="button" onClick={resetErrorBoundary}>
      Erneut versuchen
    </button>
  </div>
);

type AppErrorBoundaryProps = {
  reportError: ReportError;
  children: ReactNode;
};

// Übung: Melde Render Errors über die onError-Prop von ErrorBoundary.
export const AppErrorBoundary = ({ children }: AppErrorBoundaryProps) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
);
