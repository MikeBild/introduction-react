# Testing

Teste, was Nutzer sehen und tun. Ein Test sucht Elemente per Role und Label, klickt und tippt mit `user-event` und prüft, was danach auf dem Bildschirm steht. Interna wie State oder Hooks prüft er nicht.

## Werkzeuge

- [Vitest](https://vitest.dev) als Test Runner, konfiguriert in `vite.config.ts`
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro) mit `jest-dom`-Matchern
- `vi.spyOn(globalThis, 'fetch')` für die API: Jeder Test legt fest, was der Server antwortet

```tsx
const mockFetchResponse = (status: number, body: unknown) =>
  vi.spyOn(globalThis, 'fetch').mockImplementation(() =>
    Promise.resolve(Response.json(body, { status }))
  );

it('zeigt einen Server Error am Feld', async () => {
  mockFetchResponse(409, { field: 'email', message: 'E-Mail ist schon registriert' });
  render(<SignupForm />);
  await userEvent.type(screen.getByLabelText('E-Mail'), 'taken@example.com');
  await userEvent.type(screen.getByLabelText('Passwort'), 'geheim123');
  await userEvent.click(screen.getByRole('button', { name: 'Registrieren' }));
  expect(await screen.findByText('E-Mail ist schon registriert')).toBeInTheDocument();
});
```

## Regeln

- Nimm zuerst `getByRole`, dann `getByLabelText`, erst zuletzt `getByTestId`.
- Warte auf asynchrone Änderungen mit `findBy…`, nicht mit festen Timeouts.
- Setz Mocks nach jedem Test mit `vi.restoreAllMocks()` zurück, zum Beispiel in `test-setup.ts`.
- Prüf auch, dass ein Request **nicht** passiert, etwa bei einem Validation Error: `expect(fetchSpy).not.toHaveBeenCalled()`.

Wenn viele Tests dieselbe API brauchen oder du auch im Browser gegen eine Fake-API entwickeln willst, lohnt sich [MSW](https://mswjs.io). Für eine Form reicht der `fetch`-Spy.

## Übung

Lektion **Teste, was Nutzer sehen und tun** (`react-testing`): [examples/testing](examples/testing/README.md)

Die alte Fassung dieses Kapitels (Jest, Enzyme) liegt unter [legacy/chapters/10-testing.md](legacy/chapters/10-testing.md).
