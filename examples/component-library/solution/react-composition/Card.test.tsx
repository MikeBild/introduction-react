import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { customers } from '../../src/data/customers';
import { Card } from './Card';
import { CustomerOverview } from './CustomerOverview';

it('rendert header, children und actions in ihre Slots', () => {
  render(
    <Card header={<h3>Titel</h3>} actions={<button>Los</button>}>
      <p>Inhalt</p>
    </Card>
  );
  const card = screen.getByRole('article');
  expect(within(card).getByRole('heading', { name: 'Titel' })).toBeVisible();
  expect(within(card).getByText('Inhalt')).toBeVisible();
  expect(within(card).getByRole('button', { name: 'Los' })).toBeVisible();
});

it('lässt den Footer weg, wenn es keine actions gibt', () => {
  const { container } = render(<Card header="Nur Kopf" />);
  expect(container.querySelector('footer')).toBeNull();
});

it('zeigt jeden Kunden als Card und meldet Bearbeiten', async () => {
  const onEdit = vi.fn();
  render(<CustomerOverview customers={customers} onEdit={onEdit} />);
  const cards = screen.getAllByRole('article');
  expect(cards).toHaveLength(3);
  await userEvent.click(
    within(cards[1]).getByRole('button', { name: 'Bearbeiten' })
  );
  expect(onEdit).toHaveBeenCalledWith(customers[1]);
});
