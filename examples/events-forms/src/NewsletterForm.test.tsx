import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { NewsletterForm } from './NewsletterForm';

it('zeigt das Feld für den Namen', () => {
  render(<NewsletterForm onSubscribe={() => {}} />);
  expect(screen.getByLabelText('Name')).toBeInTheDocument();
});

// Übung: .skip Schritt für Schritt entfernen
it.skip('deaktiviert den Button, solange ein Feld leer ist', async () => {
  render(<NewsletterForm onSubscribe={() => {}} />);
  const submitButton = screen.getByRole('button', { name: 'Anmelden' });
  expect(submitButton).toBeDisabled();
  await userEvent.type(screen.getByLabelText('Name'), 'Ada');
  expect(submitButton).toBeDisabled();
  await userEvent.type(screen.getByLabelText('E-Mail'), 'ada@example.com');
  expect(submitButton).toBeEnabled();
});

it.skip('übergibt beide Werte an onSubscribe und leert das Formular', async () => {
  const onSubscribe = vi.fn();
  render(<NewsletterForm onSubscribe={onSubscribe} />);
  await userEvent.type(screen.getByLabelText('Name'), 'Ada');
  await userEvent.type(screen.getByLabelText('E-Mail'), 'ada@example.com');
  await userEvent.click(screen.getByRole('button', { name: 'Anmelden' }));
  expect(onSubscribe).toHaveBeenCalledWith({
    name: 'Ada',
    email: 'ada@example.com',
  });
  expect(screen.getByLabelText('Name')).toHaveValue('');
});

it.skip('zählt Leerzeichen nicht als Eingabe', async () => {
  render(<NewsletterForm onSubscribe={() => {}} />);
  await userEvent.type(screen.getByLabelText('Name'), '   ');
  await userEvent.type(screen.getByLabelText('E-Mail'), 'ada@example.com');
  expect(screen.getByRole('button', { name: 'Anmelden' })).toBeDisabled();
});
