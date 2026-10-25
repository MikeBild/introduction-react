import { z } from 'zod';

// Exercise: add `age` (number, at least 18) and `acceptsTerms` (checkbox).
export const SignupSchema = z.object({
  email: z.string().trim().pipe(z.email('Please enter a valid email')),
});

export type SignupInput = z.infer<typeof SignupSchema>;
export type FieldErrors = Partial<Record<keyof SignupInput, string>>;

export const toFieldErrors = (error: z.ZodError<SignupInput>): FieldErrors =>
  Object.fromEntries(
    Object.entries(z.flattenError(error).fieldErrors).map(
      ([fieldName, messages]) => [fieldName, messages?.[0]]
    )
  );
