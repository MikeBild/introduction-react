import { z } from 'zod';

export const SignupSchema = z.object({
  email: z.string().trim().pipe(z.email('Please enter a valid email')),
  age: z.coerce
    .number('Please enter your age')
    .int('Please enter whole years')
    .min(18, 'You must be at least 18'),
  acceptsTerms: z.literal('on', 'Please accept the terms'),
});

export type SignupInput = z.infer<typeof SignupSchema>;
export type FieldErrors = Partial<Record<keyof SignupInput, string>>;

export const toFieldErrors = (error: z.ZodError<SignupInput>): FieldErrors =>
  Object.fromEntries(
    Object.entries(z.flattenError(error).fieldErrors).map(
      ([fieldName, messages]) => [fieldName, messages?.[0]]
    )
  );
