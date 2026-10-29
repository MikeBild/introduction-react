import type { ComponentProps } from 'react';

export const Input = ({
  className,
  ...inputProps
}: ComponentProps<'input'>) => (
  <input
    className={['input', className].filter(Boolean).join(' ')}
    {...inputProps}
  />
);
