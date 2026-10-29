import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw/http';
import { expect, it } from 'vitest';
import { server } from '../src/mocks/server';
import { SignupForm } from '../src/SignupForm';

const fillAndSubmit = async (email: string, password: string) => {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('E-Mail'), email);
  await user.type(screen.getByLabelText('Passwort'), password);
  await user.click(screen.getByRole('button', { name: 'Registrieren' }));
};

it('begrüßt dich nach erfolgreicher Registrierung', async () => {
  render(<SignupForm />);
  await fillAndSubmit('ada@example.com', 'geheim123');
  expect(await screen.findByRole('status')).toHaveTextContent(
    'Willkommen an Bord!'
  );
});

it('zeigt den Validation Error am Feld und sendet keinen Request', async () => {
  // Jeder Request würde hier auffallen – der Handler zählt mit.
  let requestCount = 0;
  server.use(
    http.post('/api/signup', () => {
      requestCount += 1;
      return HttpResponse.json({ id: 'u1' }, { status: 201 });
    })
  );
  render(<SignupForm />);
  await fillAndSubmit('keine-mail', 'kurz');
  expect(screen.getByLabelText('E-Mail')).toHaveAccessibleDescription(
    'Bitte gib eine gültige E-Mail-Adresse ein'
  );
  expect(screen.getByLabelText('Passwort')).toBeInvalid();
  expect(requestCount).toBe(0);
});

it('zeigt einen Server Error, wenn die E-Mail schon registriert ist', async () => {
  server.use(
    http.post('/api/signup', () =>
      HttpResponse.json({ message: 'conflict' }, { status: 409 })
    )
  );
  render(<SignupForm />);
  await fillAndSubmit('ada@example.com', 'geheim123');
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Diese E-Mail-Adresse ist schon registriert.'
  );
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
});

it('zeigt eine allgemeine Meldung bei einem 500er', async () => {
  server.use(
    http.post('/api/signup', () => new HttpResponse(null, { status: 500 }))
  );
  render(<SignupForm />);
  await fillAndSubmit('ada@example.com', 'geheim123');
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Die Registrierung ist fehlgeschlagen.'
  );
});
