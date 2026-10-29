import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../../src/components/Badge';
import { Button } from '../../src/components/Button';
import { Card } from './Card';

const meta = {
  title: 'Composition/Card',
  component: Card,
  args: { header: <h3>Ada Lovelace</h3> },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderOnly: Story = {};
export const WithContent: Story = {
  args: { children: <p>Analytical Engines GmbH</p> },
};
export const WithActions: Story = {
  args: {
    header: (
      <h3>
        Ada Lovelace <Badge>Premium</Badge>
      </h3>
    ),
    children: <p>Analytical Engines GmbH</p>,
    actions: (
      <>
        <Button>Bearbeiten</Button>
        <Button variant="secondary">Löschen</Button>
      </>
    ),
  },
};
