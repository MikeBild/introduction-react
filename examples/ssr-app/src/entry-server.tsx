import { StrictMode } from 'react';
import {
  renderToPipeableStream,
  type RenderToPipeableStreamOptions,
} from 'react-dom/server';
import { App } from './App';
import type { ProductPageData } from './productPage';

export { loadProductPage, serializeProductPageData } from './productPage';

// Rendert die Seite auf dem Server als HTML-Stream.
export const render = (
  data: ProductPageData,
  options: RenderToPipeableStreamOptions
) =>
  renderToPipeableStream(
    <StrictMode>
      <App data={data} />
    </StrictMode>,
    options
  );
