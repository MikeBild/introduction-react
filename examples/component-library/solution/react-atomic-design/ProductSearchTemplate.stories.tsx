import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { products } from '../../src/data/products';
import { SearchField } from './molecules/SearchField';
import { ProductResultList } from './organisms/ProductResultList';
import { ProductSearchTemplate } from './templates/ProductSearchTemplate';

const meta = {
  title: 'Atomic Design/Templates/ProductSearchTemplate',
  component: ProductSearchTemplate,
  args: {
    title: 'Produktsuche',
    searchField: (
      <SearchField label="Produkt suchen" value="" onChange={fn()} />
    ),
    resultSummary: `${products.length} Treffer`,
    results: <ProductResultList products={products} />,
  },
} satisfies Meta<typeof ProductSearchTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithResults: Story = {};
export const NoResults: Story = {
  args: {
    resultSummary: '0 Treffer',
    results: <ProductResultList products={[]} />,
  },
};
