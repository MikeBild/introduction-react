import type { ComponentProps } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

type ButtonProps = ComponentProps<'button'> & { variant?: ButtonVariant };

const baseClasses =
  'rounded px-4 py-2 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50';

// Record statt switch: Fehlt eine Variant, meldet TypeScript das sofort.
// Die Klassen stehen vollständig im Code, damit Tailwind sie findet.
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-blue-600',
  secondary:
    'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 focus-visible:outline-slate-400',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600',
};

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
