import { render } from '@testing-library/react';
import type { ReactNode } from 'react';

// Übung: Sobald du TanStack Query nutzt, braucht jeder Test einen eigenen
// QueryClient (retry: false) im QueryClientProvider. Ergänze ihn hier.
export const renderWithClient = (ui: ReactNode) => render(ui);
