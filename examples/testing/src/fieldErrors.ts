import type { z } from 'zod';

export type FieldErrors = Record<string, string>;

// The issue's path as the key, text from the UI instead of from the schema.
const messages: Record<string, string> = {
  customerId: 'Bitte wähle einen Kunden',
  quantity: 'Bitte eine ganze Zahl ab 1',
  items: 'Der Warenkorb ist leer',
};

export const toFieldErrors = (
  issues: readonly z.core.$ZodIssue[]
): FieldErrors =>
  Object.fromEntries(
    issues.map((issue) => [
      issue.path.join('.'),
      messages[String(issue.path.at(-1))] ?? issue.message,
    ])
  );
