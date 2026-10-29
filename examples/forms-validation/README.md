# Forms Validation

Eine Signup Form, validiert mit einem einzigen [zod](https://zod.dev)-Schema. Errors hängen an ihrem Feld.

Lektion: **Ein Schema für Form, Server und Typ** (`react-forms-validation`)

```bash
npm install
npm run dev
npm test
```

## Übung

1. Erweitere `SignupSchema` in `src/signupSchema.ts` um `age` (`z.coerce.number()`, mindestens 18) und `acceptsTerms` (Checkbox, `z.literal('on')`). Der Typ der Form-Daten folgt über `z.infer`.
2. Rendere beide Felder in `src/SignupForm.tsx` mit sichtbarem `label`, `aria-invalid` und `aria-describedby` – wie das E-Mail-Feld.
3. Zeig Server Errors (probier `taken@example.com`) am passenden Feld statt im Banner.
4. Entferne `.skip` in `src/SignupForm.test.tsx`.

## Lösung

Eine mögliche Lösung liegt in `solution/`.
