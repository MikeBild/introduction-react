import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '../src/App';
import { env } from '../src/env';
import { ErrorBoundary } from './ErrorBoundary';
import {
  createErrorReporter,
  installGlobalErrorHandlers,
} from './errorReporting';

const reportError = createErrorReporter(env.VITE_RELEASE);
installGlobalErrorHandlers(reportError);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      fallback={<p>Something went wrong. Please reload.</p>}
      onError={(error) => reportError(error, 'render')}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);
