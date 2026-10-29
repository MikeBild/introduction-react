import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { SignupForm } from '../src/SignupForm';
import { mockFetchResponse } from '../src/test-utils';

const fillAndSubmit = async (email: string, password: string) => {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('E-Mail'), email);
  await user.type(screen.getByLabelText('Passwort'), password);
  await user.click(screen.getByRole('button', { name: 'Registrieren' }));
};

it('begrüßt dich nach erfolgreicher Registrierung', async () => {
  const fetchSpy = mockFetchResponse(201, { id: 'u1' });
  render(<SignupForm />);
  await fillAndSubmit('ada@example.com', 'geheim123');
  expect(await screen.findByRole('status')).toHaveTextContent(
    'Willkommen an Bord!'
  );
  expect(fetchSpy).toHaveBeenCalledWith(
    '/api/signup',
    expect.objectContaining({ method: 'POST' })
  );
});

it('zeigt den Validation Error am Feld und sendet keinen Request', async () => {
  const fetchSpy = mockFetchResponse(201, { id: 'u1' });
  render(<SignupForm />);
  await fillAndSubmit('keine-mail', 'kurz');
  expect(screen.getByLabelText('E-Mail')).toHaveAccessibleDescription(
    'Bitte gib eine gültige E-Mail-Adresse ein'
  );
  expect(screen.getByLabelText('Passwort')).toBeInvalid();
  expect(fetchSpy).not.toHaveBeenCalled();
});

it('zeigt einen Server Error, wenn die E-Mail schon registriert ist', async () => {
  mockFetchResponse(409, { message: 'conflict' });
  render(<SignupForm />);
  await fillAndSubmit('ada@example.com', 'geheim123');
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Diese E-Mail-Adresse ist schon registriert.'
  );
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
});

it('zeigt eine allgemeine Meldung bei einem 500er', async () => {
  mockFetchResponse(500, { message: 'boom' });
  render(<SignupForm />);
  await fillAndSubmit('ada@example.com', 'geheim123');
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Die Registrierung ist fehlgeschlagen.'
  );
});
