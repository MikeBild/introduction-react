# Testing

Eine fertige Signup Form mit zod-Validation und einem `POST /api/signup`. Was fehlt, sind die Tests. Du schreibst sie mit Vitest und Testing Library und mockst die API mit [MSW](https://mswjs.io).

Lektion: **Teste, was Nutzer sehen und tun** (`react-testing`).

```bash
npm install
npm run dev
npm test
```

MSW ist schon eingerichtet: `src/test-setup.ts` startet den Server aus `src/mocks/server.ts` vor allen Tests und setzt die Handler nach jedem Test zurück. Ein Request ohne Handler lässt den Test scheitern (`onUnhandledFrame: 'error'`, in MSW 2 hieß die Option noch `onUnhandledRequest`).

## Übung

Ersetze die drei `it.todo` in `src/SignupForm.test.tsx` durch echte Tests:

1. **Erfolgsfall:** Füll E-Mail und Passwort aus, klick „Registrieren“ und erwarte „Willkommen an Bord!“. Der Standard-Handler aus `src/mocks/handlers.ts` antwortet mit 201.
2. **Validation Error:** Gib eine ungültige E-Mail ein. Prüf mit `toHaveAccessibleDescription`, dass die Meldung am Feld hängt, und stell sicher, dass kein Request rausgeht.
3. **Server Error:** Überschreib den Handler im Test mit `server.use(http.post('/api/signup', …))` und antworte mit Status 409. Erwarte die Meldung in der `alert`-Rolle.

Regeln dabei:

- Such Elemente über Rolle und Label (`getByRole`, `getByLabelText`), nicht über CSS-Klassen oder Test-IDs.
- Klick und tipp mit `userEvent`, nicht mit `fireEvent`.
- Warte mit `findBy…` auf Text, der erst nach dem Request erscheint.

## Lösung

`solution/SignupForm.test.tsx` enthält die drei Tests und einen vierten für einen 500er.
