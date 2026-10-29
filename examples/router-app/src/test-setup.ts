import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
  // Jeder Test startet wieder auf der Startseite.
  window.history.replaceState(null, '', '/');
});
