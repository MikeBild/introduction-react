import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from '../src/App';
import type { ProductPageData } from '../src/productPage';

// Hydration: React übernimmt das Server-HTML, statt es neu zu bauen,
// und hängt die Event Handler an. Die Daten müssen dieselben sein wie
// auf dem Server, sonst meldet React einen Hydration Mismatch.
export const hydrate = (container: HTMLElement, data: ProductPageData) =>
  hydrateRoot(
    container,
    <StrictMode>
      <App data={data} />
    </StrictMode>
  );
