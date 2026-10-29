import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { ProfilePanel } from './ProfilePanel';
import { customers } from './shop';

const customer = customers[0];

it('öffnet die Profil-Region per Tastatur', async () => {
  render(<ProfilePanel customer={customer} onSave={() => {}} />);
  await userEvent.tab();
  await userEvent.keyboard('{Enter}');
  expect(
    screen.getByRole('region', { name: 'Profil von Ada Schmidt' })
  ).toBeInTheDocument();
});

// Übung: .skip entfernen
it.skip('speichert per Tastatur', async () => {
  const onSave = vi.fn();
  render(<ProfilePanel customer={customer} onSave={onSave} />);
  await userEvent.click(
    screen.getByRole('button', { name: 'Profil bearbeiten' })
  );
  screen.getByRole('button', { name: 'Speichern' }).focus();
  await userEvent.keyboard('{Enter}');
  expect(onSave).toHaveBeenCalledOnce();
});

it.skip('setzt den Focus nach dem Schließen zurück auf den Auslöser', async () => {
  render(<ProfilePanel customer={customer} onSave={() => {}} />);
  await userEvent.click(
    screen.getByRole('button', { name: 'Profil bearbeiten' })
  );
  await userEvent.click(
    screen.getByRole('button', { name: 'Profil schließen' })
  );
  expect(screen.queryByRole('region')).not.toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Profil bearbeiten' })
  ).toHaveFocus();
});
