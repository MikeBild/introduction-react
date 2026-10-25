import { expect, it } from 'vitest';
import { SignupSchema } from './signupSchema';

it('coerces the age from the input text', () => {
  expect(
    SignupSchema.parse({
      email: 'ada@example.com',
      age: '36',
      acceptsTerms: 'on',
    })
  ).toEqual({ email: 'ada@example.com', age: 36, acceptsTerms: 'on' });
});
