import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
  // Jeder Test startet wieder auf "/".
  window.history.replaceState(null, '', '/');
});
