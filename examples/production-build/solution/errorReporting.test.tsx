import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { AppErrorBoundary } from './AppErrorBoundary';
import { createErrorReporter } from './errorReporting';

it('meldet den Error mit der Release-Version', () => {
  const sendReport = vi.fn();
  createErrorReporter('1.2.0', sendReport)(new Error('Boom'), 'window');
  expect(sendReport).toHaveBeenCalledWith(
    expect.objectContaining({ message: 'Error: Boom', release: '1.2.0' })
  );
});

const BrokenWidget = () => {
  throw new Error('Render failed');
};

it('zeigt den Fallback bei Render Errors', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  render(
    <AppErrorBoundary reportError={() => {}}>
      <BrokenWidget />
    </AppErrorBoundary>
  );
  expect(screen.getByRole('alert')).toHaveTextContent(
    'Etwas ist schiefgelaufen.'
  );
});

it('meldet die aktuelle Route', () => {
  const sendReport = vi.fn();
  createErrorReporter('1.2.0', sendReport)(new Error('Boom'), 'window');
  expect(sendReport).toHaveBeenCalledWith(
    expect.objectContaining({ url: window.location.pathname })
  );
});

it('meldet Render Errors mit der Quelle render', () => {
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
