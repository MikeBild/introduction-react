import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

// Im Dev-Modus beantwortet MSW die Requests an /api direkt im Browser.
if (import.meta.env.DEV) {
  const { network } = await import('virtual:msw');
  const { handlers } = await import('./mocks/handlers');
  network.configure({ handlers });
  await network.enable();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
