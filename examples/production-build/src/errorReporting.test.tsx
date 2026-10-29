import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { AppErrorBoundary } from './AppErrorBoundary';
import { createErrorReporter } from './errorReporting';

it('reports the error with the release version', () => {
  const sendReport = vi.fn();
  createErrorReporter('1.2.0', sendReport)(new Error('Boom'), 'window');
  expect(sendReport).toHaveBeenCalledWith(
    expect.objectContaining({ message: 'Error: Boom', release: '1.2.0' })
  );
});

const BrokenWidget = () => {
  throw new Error('Render failed');
};

it('shows the fallback for render errors', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  render(
    <AppErrorBoundary reportError={() => {}}>
      <BrokenWidget />
    </AppErrorBoundary>
  );
  expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong.');
});

// Exercise: remove .skip
it.skip('reports the current route', () => {
  const sendReport = vi.fn();
  createErrorReporter('1.2.0', sendReport)(new Error('Boom'), 'window');
  expect(sendReport).toHaveBeenCalledWith(
    expect.objectContaining({ url: window.location.pathname })
  );
});

it.skip('reports render errors with source render', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  const reportError = vi.fn();
  render(
    <AppErrorBoundary reportError={reportError}>
      <BrokenWidget />
    </AppErrorBoundary>
  );
  expect(reportError).toHaveBeenCalledWith(
    new Error('Render failed'),
    'render'
  );
});
