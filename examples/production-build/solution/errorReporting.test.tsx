import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';
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
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <BrokenWidget />
    </ErrorBoundary>
  );
  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
});

it('reports the current route', () => {
  const sendReport = vi.fn();
  createErrorReporter('1.2.0', sendReport)(new Error('Boom'), 'window');
  expect(sendReport).toHaveBeenCalledWith(
    expect.objectContaining({ url: window.location.pathname })
  );
});

it('reports render errors via onError', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  const onError = vi.fn();
  render(
    <ErrorBoundary fallback={<p>Something went wrong</p>} onError={onError}>
      <BrokenWidget />
    </ErrorBoundary>
  );
  expect(onError).toHaveBeenCalledWith(new Error('Render failed'));
});
