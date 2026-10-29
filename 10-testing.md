# Testing

Teste, was Nutzer sehen und tun. Ein Test sucht Elemente per Role und Label, klickt und tippt mit `user-event` und prüft, was danach auf dem Bildschirm steht. Interna wie State oder Hooks prüft er nicht.

## Werkzeuge

- [Vitest](https://vitest.dev) als Test Runner, konfiguriert in `vite.config.ts`
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro) mit `jest-dom`-Matchern
- [MSW](https://mswjs.io) für die API: Er fängt `fetch` auf Netzwerkebene ab

```tsx
import { http, HttpResponse } from 'msw/http';

it('zeigt einen Server Error am Feld', async () => {
  server.use(
    http.post('/api/signup', () =>
      HttpResponse.json({ field: 'email', message: 'E-Mail ist schon registriert' }, { status: 409 })
    )
  );
  render(<SignupForm />);
  await userEvent.type(screen.getByLabelText('E-Mail'), 'taken@example.com');
  await userEvent.click(screen.getByRole('button', { name: 'Registrieren' }));
  expect(await screen.findByText('E-Mail ist schon registriert')).toBeInTheDocument();
});
```

## Regeln

- Nimm zuerst `getByRole`, dann `getByLabelText`, erst zuletzt `getByTestId`.
- Warte auf asynchrone Änderungen mit `findBy…`, nicht mit festen Timeouts.
- Starte MSW mit `server.listen({ onUnhandledFrame: 'error' })`, damit kein Request unbemerkt durchrutscht. In MSW 3 heißt die Option so, `http` und `HttpResponse` kommen aus `msw/http`.

## Übung

Lektion **Teste, was Nutzer sehen und tun** (`react-testing`): [examples/testing](examples/testing/README.md)

Die alte Fassung dieses Kapitels (Jest, Enzyme) liegt unter [legacy/chapters/10-testing.md](legacy/chapters/10-testing.md).
