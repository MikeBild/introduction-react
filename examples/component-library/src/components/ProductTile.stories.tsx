import type { Meta, StoryObj } from '@storybook/react-vite';
import { products } from '../data/products';
import { ProductTile } from './ProductTile';

const meta = {
  title: 'Start/ProductTile',
  component: ProductTile,
  decorators: [(Story) => <ul>{Story()}</ul>],
  args: { product: products[0] },
} satisfies Meta<typeof ProductTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SoldOut: Story = { args: { product: products[1] } };
