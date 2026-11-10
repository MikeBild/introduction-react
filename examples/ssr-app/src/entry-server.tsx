import { StrictMode } from 'react';
import {
  renderToPipeableStream,
  type RenderToPipeableStreamOptions,
} from 'react-dom/server';
import { App } from './App';
import type { ProductPageData } from './productPage';

export { loadProductPage, serializeProductPageData } from './productPage';

// Renders the page on the server as an HTML stream.
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
