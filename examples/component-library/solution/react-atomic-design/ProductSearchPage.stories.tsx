import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductSearchPage } from './pages/ProductSearchPage';

const meta = {
  title: 'Atomic Design/Pages/ProductSearchPage',
  component: ProductSearchPage,
} satisfies Meta<typeof ProductSearchPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
