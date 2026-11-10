import type { ComponentProps } from 'react';

// Complete class names in a map – Tailwind only finds what appears literally in the code.
const variantClasses = {
  primary: 'bg-blue-700 text-white hover:bg-blue-800',
  secondary:
    'bg-white text-slate-900 border border-slate-300 hover:bg-slate-50',
  danger: 'bg-red-700 text-white hover:bg-red-800',
} as const satisfies Record<string, string>;

// The variant is a union type of the map's keys.
type ButtonVariant = keyof typeof variantClasses;

type ButtonProps = ComponentProps<'button'> & { variant?: ButtonVariant };

const baseClasses =
  'rounded-md px-4 py-2 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50';

export const Button = ({
  variant = 'primary',
  type = 'button',
  className = '',
  ...buttonProps
}: ButtonProps) => (
  <button
    type={type}
    className={`${baseClasses} ${variantClasses[variant]} ${className}`.trim()}
    {...buttonProps}
  />
);
