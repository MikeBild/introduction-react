*English · [Deutsch](README.de.md)*

# Accessible Components

The profile panel in the account area of the workshop shop, with a few barriers: semantic HTML first, ARIA only where HTML is not enough.

Lesson: **Accessibility from the start** (`react-accessibility`)

```bash
npm install
npm run dev
npm test
```

## Exercise

1. Operate the panel in `src/ProfilePanel.tsx` with the keyboard only. Where do you get stuck?
2. Replace the clickable `div` and the `span` with real buttons. The icon button needs an accessible name (“Profil schließen”, close profile).
3. After closing, move focus back to the “Profil bearbeiten” (edit profile) button (`useRef`).
4. Remove `.skip` in `src/ProfilePanel.test.tsx`. The tests query by role, just like a screen reader.

`src/EmailField.tsx` is the reference for labels and error messages.

## Reference solution

A reference solution is in `solution/`.
