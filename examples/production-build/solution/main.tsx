import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '../src/App';
import { env } from '../src/env';
import { AppErrorBoundary } from './AppErrorBoundary';
import {
  createErrorReporter,
  installGlobalErrorHandlers,
} from './errorReporting';

const reportError = createErrorReporter(env.VITE_RELEASE);
installGlobalErrorHandlers(reportError);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary reportError={reportError}>
      <App />
    </AppErrorBoundary>
  </StrictMode>
);
