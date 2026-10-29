import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { CustomerCard } from './CustomerCard';

// Jede Story braucht eine andere Flag-Kombination – ein Zeichen für zu viele Flags.
const meta = {
  title: 'Start/CustomerCard',
  component: CustomerCard,
  args: {
    title: 'Ada Schmidt',
    subtitle: 'ada@example.com',
    onEdit: fn(),
    onDelete: fn(),
  },
} satisfies Meta<typeof CustomerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Minimal: Story = {};
export const WithEverything: Story = {
  args: {
    showAvatar: true,
    avatarUrl: 'https://i.pravatar.cc/80?u=ada',
    showBadge: true,
    badgeText: '2 Bestellungen',
    showActions: true,
    showDeleteAction: true,
  },
};
export const Compact: Story = { args: { isCompact: true, showActions: true } };
