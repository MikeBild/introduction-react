import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { SignupForm } from './SignupForm';

it('shows the email error at the field', async () => {
  const registerUser = vi.fn(() => Promise.resolve());
  render(<SignupForm registerUser={registerUser} />);
  await userEvent.type(screen.getByLabelText('Email'), 'not-an-email');
  await userEvent.click(screen.getByRole('button', { name: 'Sign up' }));
  expect(screen.getByLabelText('Email')).toHaveAccessibleDescription(
    'Please enter a valid email'
  );
  expect(registerUser).not.toHaveBeenCalled();
});

it('rejects people under 18', async () => {
  render(<SignupForm registerUser={() => Promise.resolve()} />);
  await userEvent.type(screen.getByLabelText('Age'), '17');
  await userEvent.click(screen.getByRole('button', { name: 'Sign up' }));
  expect(screen.getByLabelText('Age')).toHaveAccessibleDescription(
    'You must be at least 18'
  );
});

it('shows server errors at the field', async () => {
  const registerUser = () =>
    Promise.reject({ field: 'email', message: 'Email is already registered' });
  render(<SignupForm registerUser={registerUser} />);
  await userEvent.type(screen.getByLabelText('Email'), 'taken@example.com');
  await userEvent.type(screen.getByLabelText('Age'), '30');
  await userEvent.click(screen.getByLabelText('I accept the terms'));
  await userEvent.click(screen.getByRole('button', { name: 'Sign up' }));
  expect(
    await screen.findByText('Email is already registered')
  ).toBeInTheDocument();
  expect(screen.getByLabelText('Email')).toHaveAccessibleDescription(
    'Email is already registered'
  );
});

it('requires the terms to be accepted', async () => {
  render(<SignupForm registerUser={() => Promise.resolve()} />);
  await userEvent.click(screen.getByRole('button', { name: 'Sign up' }));
  expect(
    screen.getByLabelText('I accept the terms')
  ).toHaveAccessibleDescription('Please accept the terms');
});
