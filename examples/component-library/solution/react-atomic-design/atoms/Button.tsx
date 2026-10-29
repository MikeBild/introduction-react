import type { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary';
};

export const Button = ({
  variant = 'primary',
  type = 'button',
  className,
  ...buttonProps
}: ButtonProps) => (
  <button
    type={type}
    className={['button', `button--${variant}`, className]
      .filter(Boolean)
      .join(' ')}
    {...buttonProps}
  />
);
