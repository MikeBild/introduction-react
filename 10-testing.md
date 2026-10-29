# Testing

Teste, was Nutzer sehen und tun. Ein Test sucht Elemente per Role und Label, klickt und tippt mit `user-event` und prüft, was danach auf dem Bildschirm steht. Interna wie State oder Hooks prüft er nicht.

## Werkzeuge

- [Vitest](https://vitest.dev) als Test Runner, konfiguriert in `vite.config.ts`
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro) mit `jest-dom`-Matchern
- `vi.stubGlobal('fetch', …)` für die API: Jeder Test legt fest, was der Server antwortet

```tsx
const mockFetchResponse = (status: number, body: unknown) => {
  const fetchMock = vi.fn(async () => Response.json(body, { status }));
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};

it('meldet einen Server Error mit Status 500', async () => {
  const user = userEvent.setup();
  mockFetchResponse(500, null);
  render(<CheckoutForm cart={initialCart} />);

  await user.selectOptions(screen.getByLabelText('Kunde'), 'Ada Schmidt');
  await user.click(screen.getByRole('button', { name: 'Bestellen' }));

  expect(await screen.findByRole('alert')).toHaveTextContent('HTTP 500');
});
```

## Regeln

- Nimm zuerst `getByRole`, dann `getByLabelText`, erst zuletzt `getByTestId`.
- Warte auf asynchrone Änderungen mit `findBy…`, nicht mit festen Timeouts.
- Stell das echte `fetch` nach jedem Test mit `vi.unstubAllGlobals()` wieder her, zum Beispiel in `src/test/setup.ts`.
- Prüf auch, dass ein Request **nicht** passiert, etwa bei einem Validation Error: `expect(fetchSpy).not.toHaveBeenCalled()`.

Wenn viele Tests dieselbe API brauchen oder du auch im Browser gegen eine Fake-API entwickeln willst, lohnt sich [Mock Service Worker (MSW)](https://mswjs.io). Für eine Form reicht der `fetch`-Spy.

## Übung

Lektion **Teste, was Nutzer sehen und tun** (`react-testing`): [examples/testing](examples/testing/README.md)

Die alte Fassung dieses Kapitels (Jest, Enzyme) liegt unter [legacy/chapters/10-testing.md](legacy/chapters/10-testing.md).
