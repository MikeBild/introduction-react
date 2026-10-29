import { z } from 'zod';

export const SignupSchema = z.object({
  email: z.email('Bitte gib eine gültige E-Mail-Adresse ein'),
  password: z.string().min(8, 'Das Passwort braucht mindestens 8 Zeichen'),
});

export type Signup = z.infer<typeof SignupSchema>;
export type FieldErrors = Partial<Record<keyof Signup, string>>;

export const toFieldErrors = (error: z.ZodError<Signup>): FieldErrors => {
  const { fieldErrors } = z.flattenError(error);
  return {
    email: fieldErrors.email?.[0],
    password: fieldErrors.password?.[0],
  };
};
