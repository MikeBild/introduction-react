import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from '../src/App';
import type { ProductPageData } from '../src/productPage';

// Hydration: React adopts the server HTML instead of building it anew,
// and attaches the event handlers. The data has to be the same as
// on the server, otherwise React reports a Hydration Mismatch.
export const hydrate = (container: HTMLElement, data: ProductPageData) =>
  hydrateRoot(
    container,
    <StrictMode>
      <App data={data} />
    </StrictMode>
  );
