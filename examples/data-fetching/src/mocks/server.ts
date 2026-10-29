import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Dieselben Handler wie im Browser – hier für Vitest in Node.
export const server = setupServer(...handlers);
