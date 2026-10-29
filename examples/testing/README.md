# Testing

Eine fertige Signup Form mit zod-Validation und einem `POST /api/signup`. Was fehlt, sind die Tests. Du schreibst sie mit Vitest und Testing Library und ersetzt `fetch` im Test durch einen Spy.

Lektion: **Teste, was Nutzer sehen und tun** (`react-testing`).

```bash
npm install
npm run dev
npm test
```

Im Dev-Modus beantwortet eine kleine Fake-API in `vite.config.ts` den Request, jede Registrierung klappt. In den Tests gibt es keinen Server. `mockFetchResponse(status, body)` aus `src/test-utils.ts` ersetzt `fetch` für einen Test und gibt den Spy zurück. `src/test-setup.ts` stellt das echte `fetch` nach jedem Test wieder her.

## Übung

Ersetze die drei `it.todo` in `src/SignupForm.test.tsx` durch echte Tests:

1. **Erfolgsfall:** Antworte mit `mockFetchResponse(201, { id: 'u1' })`. Füll E-Mail und Passwort aus, klick „Registrieren“ und erwarte „Willkommen an Bord!“.
2. **Validation Error:** Gib eine ungültige E-Mail ein. Prüf mit `toHaveAccessibleDescription`, dass die Meldung am Feld hängt, und stell mit `expect(fetchSpy).not.toHaveBeenCalled()` sicher, dass kein Request rausgeht.
3. **Server Error:** Antworte mit Status 409. Erwarte die Meldung in der `alert`-Rolle.

Regeln dabei:

- Such Elemente über Rolle und Label (`getByRole`, `getByLabelText`), nicht über CSS-Klassen oder Test-IDs.
- Klick und tipp mit `userEvent`, nicht mit `fireEvent`.
- Warte mit `findBy…` auf Text, der erst nach dem Request erscheint.
- Mock nur die Grenze nach außen, hier `fetch`. Die Form selbst samt zod-Schema läuft echt.

Die Lektion zeigt dafür [MSW](https://mswjs.io), das HTTP auf Netzwerkebene abfängt. Für eine Form mit einem einzigen Request reicht ein `fetch`-Spy und spart ein Paket. Sobald mehrere Components dieselbe API nutzen, lohnt sich MSW.

## Lösung

`solution/SignupForm.test.tsx` enthält die drei Tests und einen vierten für einen 500er.
