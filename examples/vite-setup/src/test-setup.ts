import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
  // Stellt das echte fetch nach jedem Test wieder her.
  vi.restoreAllMocks();
});
