import { useState, type SubmitEvent } from 'react';
import { SignupSchema, toFieldErrors, type FieldErrors } from './signupSchema';

const toServerMessage = (status: number) =>
  status === 409
    ? 'Diese E-Mail-Adresse ist schon registriert.'
    : 'Die Registrierung ist fehlgeschlagen. Versuch es später noch einmal.';

export const SignupForm = () => {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parseResult = SignupSchema.safeParse(
      Object.fromEntries(new FormData(event.currentTarget))
    );
    if (!parseResult.success)
      return setFieldErrors(toFieldErrors(parseResult.error));
    setFieldErrors({});
    setServerError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parseResult.data),
      });
      if (!response.ok) return setServerError(toServerMessage(response.status));
      setIsRegistered(true);
    } catch {
      setServerError(toServerMessage(0));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isRegistered) return <p role="status">Willkommen an Bord!</p>;

  return (
    <form noValidate onSubmit={handleSubmit}>
      {serverError && <p role="alert">{serverError}</p>}
      <label htmlFor="email">E-Mail</label>
      <input
        id="email"
        name="email"
        type="email"
        aria-invalid={Boolean(fieldErrors.email)}
        aria-describedby={fieldErrors.email ? 'email-error' : undefined}
      />
      {fieldErrors.email && <p id="email-error">{fieldErrors.email}</p>}
      <label htmlFor="password">Passwort</label>
      <input
        id="password"
        name="password"
        type="password"
        aria-invalid={Boolean(fieldErrors.password)}
        aria-describedby={fieldErrors.password ? 'password-error' : undefined}
      />
      {fieldErrors.password && (
        <p id="password-error">{fieldErrors.password}</p>
      )}
      <button type="submit" disabled={isSubmitting}>
        Registrieren
      </button>
    </form>
  );
};
