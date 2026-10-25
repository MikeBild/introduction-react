import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { ProfilePanel } from './ProfilePanel';

it('opens the profile region by keyboard', async () => {
  render(<ProfilePanel onSave={() => {}} />);
  await userEvent.tab();
  await userEvent.keyboard('{Enter}');
  expect(screen.getByRole('region', { name: 'Profile' })).toBeInTheDocument();
});

// Exercise: remove .skip
it.skip('saves with the keyboard', async () => {
  const onSave = vi.fn();
  render(<ProfilePanel onSave={onSave} />);
  await userEvent.click(screen.getByRole('button', { name: 'Edit profile' }));
  screen.getByRole('button', { name: 'Save' }).focus();
  await userEvent.keyboard('{Enter}');
  expect(onSave).toHaveBeenCalledOnce();
});

it.skip('returns focus to the trigger after closing', async () => {
  render(<ProfilePanel onSave={() => {}} />);
  await userEvent.click(screen.getByRole('button', { name: 'Edit profile' }));
  await userEvent.click(screen.getByRole('button', { name: 'Close profile' }));
  expect(screen.queryByRole('region')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Edit profile' })).toHaveFocus();
});
