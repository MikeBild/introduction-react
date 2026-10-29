# Accessible Components

Ein Profil-Panel mit ein paar Barrieren: erst semantisches HTML, ARIA nur dort, wo HTML nicht reicht.

Lektion: **Accessibility von Anfang an** (`react-accessibility`)

```bash
npm install
npm run dev
npm test
```

## Übung

1. Bedien das Panel in `src/ProfilePanel.tsx` nur mit der Tastatur. Wo kommst du nicht weiter?
2. Ersetze das klickbare `div` und das `span` durch echte Buttons. Der Icon Button braucht einen Accessible Name („Close profile“).
3. Setz nach dem Schließen den Focus zurück auf den Button „Edit profile“ (`useRef`).
4. Entferne `.skip` in `src/ProfilePanel.test.tsx`. Die Tests suchen per Role, so wie ein Screenreader.

`src/EmailField.tsx` ist die Referenz für Labels und Fehlermeldungen.

## Lösung

Eine mögliche Lösung liegt in `solution/`.
