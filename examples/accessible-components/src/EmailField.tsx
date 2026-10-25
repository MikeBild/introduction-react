import { useId } from 'react';

// Reference: visible label, error linked via aria-describedby.
export const EmailField = ({ error }: { error?: string }) => {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  return (
    <div>
      <label htmlFor={inputId}>Email</label>
      <input
        id={inputId}
        name="email"
        type="email"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error && <p id={errorId}>{error}</p>}
    </div>
  );
};
