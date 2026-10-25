import { z } from 'zod';

const EnvSchema = z.object({
  VITE_API_URL: z.url(),
  VITE_RELEASE: z.string().min(1),
});

export type Env = z.infer<typeof EnvSchema>;

export const parseEnv = (source: Record<string, unknown>): Env =>
  EnvSchema.parse(source);

// Fails at startup – not later in front of a user.
export const env = parseEnv(import.meta.env);
