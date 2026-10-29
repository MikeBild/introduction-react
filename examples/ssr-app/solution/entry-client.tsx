import { ProductPageDataSchema } from '../src/productPage';
import { hydrate } from './hydrate';

const container = document.getElementById('root');
const initialData = document.getElementById('initial-data')?.textContent;
if (!container || !initialData)
  throw new Error('Server-HTML oder Initial Data fehlt');

hydrate(container, ProductPageDataSchema.parse(JSON.parse(initialData)));
