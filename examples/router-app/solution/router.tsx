import { createRouter, type RouterHistory } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export const createAppRouter = (history?: RouterHistory) =>
  createRouter({ routeTree, history });

// Macht die Routen im ganzen Projekt typsicher: Link, useParams, useSearch.
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createAppRouter>;
  }
}
