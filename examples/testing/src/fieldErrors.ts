import type { z } from 'zod';

export type FieldErrors = Record<string, string>;

// Pfad des Issues als Schlüssel, Text aus der Oberfläche statt aus dem Schema.
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
