# Accessible Components

A profile panel with a few accessibility barriers to fix: semantic HTML first, ARIA only where HTML is not enough.

```bash
npm install
npm run dev
npm test
```

## Exercise

1. Use the panel in `src/ProfilePanel.tsx` with the keyboard only. Where do you get stuck?
2. Replace the clickable `div` and `span` with real buttons. The icon button needs an accessible name ("Close profile").
3. After closing the panel, move the focus back to the "Edit profile" button (`useRef`).
4. Remove `.skip` from the tests in `src/ProfilePanel.test.tsx` – they query by role, like a screen reader.

`src/EmailField.tsx` is the reference for labels and error messages. A possible solution lives in `solution/`.
