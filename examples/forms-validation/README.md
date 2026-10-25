# Forms Validation

A signup form validated with a single [zod](https://zod.dev) schema, with errors linked to their fields.

```bash
npm install
npm run dev
npm test
```

## Exercise

1. Extend `SignupSchema` in `src/signupSchema.ts` with `age` (`z.coerce.number()`, at least 18) and `acceptsTerms` (checkbox, `z.literal('on')`). The form data type follows via `z.infer`.
2. Render both fields in `src/SignupForm.tsx` with a visible `label`, `aria-invalid` and `aria-describedby` – like the email field.
3. Show server errors (try `taken@example.com`) at the matching field instead of the banner.
4. Remove `.skip` from the tests in `src/SignupForm.test.tsx`.

A possible solution lives in `solution/`.
