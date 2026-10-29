import { isProductPageData } from '../src/productPage';
import { hydrate } from './hydrate';

const container = document.getElementById('root');
const initialData: unknown = JSON.parse(
  document.getElementById('initial-data')?.textContent ?? 'null'
);
if (!container || !isProductPageData(initialData))
  throw new Error('Server-HTML oder Initial Data fehlt');

hydrate(container, initialData);
