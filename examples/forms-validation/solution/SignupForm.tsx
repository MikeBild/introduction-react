import { useState, type SubmitEvent } from 'react';
import { isServerFieldError, type RegisterUser } from '../src/registerUser';
import { SignupSchema, toFieldErrors, type FieldErrors } from './signupSchema';

type FieldProps = {
  name: keyof FieldErrors;
  label: string;
  type: 'email' | 'number' | 'checkbox';
  error?: string;
};

const Field = ({ name, label, type, error }: FieldProps) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    {error && <p id={`${name}-error`}>{error}</p>}
  </div>
);

export const SignupForm = ({
  registerUser,
}: {
  registerUser: RegisterUser;
}) => {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
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
      if (isServerFieldError(error))
        return setFieldErrors({ [error.field]: error.message });
      setFormError('Registration failed');
    }
  };

  if (isRegistered) return <p>Welcome aboard!</p>;

  return (
    <form noValidate onSubmit={handleSubmit}>
      {formError && <p role="alert">{formError}</p>}
      <Field
        name="email"
        label="Email"
        type="email"
        error={fieldErrors.email}
      />
      <Field name="age" label="Age" type="number" error={fieldErrors.age} />
      <Field
        name="acceptsTerms"
        label="I accept the terms"
        type="checkbox"
        error={fieldErrors.acceptsTerms}
      />
      <button type="submit">Sign up</button>
    </form>
  );
};
