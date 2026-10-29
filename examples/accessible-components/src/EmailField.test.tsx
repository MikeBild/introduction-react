import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { EmailField } from './EmailField';

it('verknüpft Label und Error mit dem Input', () => {
  render(<EmailField error="Bitte gib eine gültige E-Mail ein" />);
  const emailInput = screen.getByRole('textbox', { name: 'E-Mail' });
  expect(emailInput).toBeInvalid();
  expect(emailInput).toHaveAccessibleDescription(
    'Bitte gib eine gültige E-Mail ein'
  );
});
