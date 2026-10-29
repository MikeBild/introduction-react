import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { SignupForm } from './SignupForm';

// Beispiel: Finde Elemente so, wie Nutzer sie finden – über Rolle und Label.
it('zeigt beide Felder und den Submit Button', () => {
  render(<SignupForm />);
  expect(screen.getByLabelText('E-Mail')).toBeInTheDocument();
  expect(screen.getByLabelText('Passwort')).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Registrieren' })
  ).toBeInTheDocument();
});

// Übung react-testing: Schreib diese drei Tests.
it.todo('begrüßt dich nach erfolgreicher Registrierung');
it.todo('zeigt den Validation Error am Feld und sendet keinen Request');
it.todo('zeigt einen Server Error, wenn die E-Mail schon registriert ist');
