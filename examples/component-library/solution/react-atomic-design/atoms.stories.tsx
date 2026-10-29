import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './atoms/Badge';
import { Button } from './atoms/Button';
import { Price } from './atoms/Price';

const meta = {
  title: 'Atomic Design/Atoms/Button',
  component: Button,
  args: { children: 'Suchen' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const NextToOtherAtoms: Story = {
  render: (args) => (
    <p>
      <Button {...args} /> <Badge>Ausverkauft</Badge>{' '}
      <Price amountInCents={4900} />
    </p>
  ),
};
