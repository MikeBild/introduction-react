import { useState, type SubmitEvent } from 'react';
import { isServerFieldError, type RegisterUser } from './registerUser';
import { SignupSchema, toFieldErrors, type FieldErrors } from './signupSchema';

export const SignupForm = ({
  registerUser,
}: {
  registerUser: RegisterUser;
}) => {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parseResult = SignupSchema.safeParse(
      Object.fromEntries(new FormData(event.currentTarget))
    );
    if (!parseResult.success)
      return setFieldErrors(toFieldErrors(parseResult.error));
    setFieldErrors({});
    try {
      await registerUser(parseResult.data);
      setIsRegistered(true);
    } catch (error) {
      // Exercise: show server field errors at the field, not as a banner.
      setServerError(
        isServerFieldError(error) ? error.message : 'Registration failed'
      );
    }
  };

  if (isRegistered) return <p>Welcome aboard!</p>;

  return (
    <form noValidate onSubmit={handleSubmit}>
      {serverError && <p role="alert">{serverError}</p>}
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        aria-invalid={Boolean(fieldErrors.email)}
        aria-describedby={fieldErrors.email ? 'email-error' : undefined}
      />
      {fieldErrors.email && <p id="email-error">{fieldErrors.email}</p>}
      <button type="submit">Sign up</button>
    </form>
  );
};
