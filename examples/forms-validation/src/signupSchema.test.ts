import { expect, it } from 'vitest';
import { SignupSchema } from './signupSchema';

it('trims and accepts a valid email', () => {
  expect(SignupSchema.parse({ email: ' ada@example.com ' })).toEqual({
    email: 'ada@example.com',
  });
});
