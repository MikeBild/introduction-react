import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { EmailField } from './EmailField';

it('links the label and the error to the input', () => {
  render(<EmailField error="Please enter a valid email" />);
  const emailInput = screen.getByRole('textbox', { name: 'Email' });
  expect(emailInput).toBeInvalid();
  expect(emailInput).toHaveAccessibleDescription('Please enter a valid email');
});
