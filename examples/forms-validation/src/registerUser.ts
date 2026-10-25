import type { SignupInput } from './signupSchema';

export type ServerFieldError = { field: keyof SignupInput; message: string };
export type RegisterUser = (input: SignupInput) => Promise<void>;

// Fake server: it validates again and rejects a known address.
export const registerUser: RegisterUser = async ({ email }) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  if (email === 'taken@example.com')
    throw { field: 'email', message: 'Email is already registered' };
};

export const isServerFieldError = (value: unknown): value is ServerFieldError =>
  typeof value === 'object' &&
  value !== null &&
  'field' in value &&
  'message' in value;
