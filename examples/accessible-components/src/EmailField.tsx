import { useId } from 'react';

// Referenz: sichtbares Label, Error per aria-describedby verknüpft.
export const EmailField = ({
  defaultValue,
  error,
}: {
  defaultValue?: string;
  error?: string;
}) => {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  return (
    <div>
      <label htmlFor={inputId}>E-Mail</label>
      <input
        id={inputId}
        name="email"
        type="email"
        defaultValue={defaultValue}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error && <p id={errorId}>{error}</p>}
    </div>
  );
};
