*English · [Deutsch](10-testing.de.md)*

# Testing

Test what users see and do. A test finds elements by role and label, clicks and types with `user-event`, and checks what is on the screen afterwards. It does not check internals such as state or hooks.

## Tools

- [Vitest](https://vitest.dev) as the test runner, configured in `vite.config.ts`
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro) with `jest-dom` matchers
- `vi.stubGlobal('fetch', …)` for the API: each test decides what the server answers

```tsx
const mockFetchResponse = (status: number, body: unknown) => {
  const fetchMock = vi.fn(async () => Response.json(body, { status }));
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};

it('reports a server error with status 500', async () => {
  const user = userEvent.setup();
  mockFetchResponse(500, null);
  render(<CheckoutForm cart={initialCart} />);

  await user.selectOptions(screen.getByLabelText('Kunde'), 'Ada Schmidt');
  await user.click(screen.getByRole('button', { name: 'Bestellen' }));

  expect(await screen.findByRole('alert')).toHaveTextContent('HTTP 500');
});
```

## Rules

- Reach for `getByRole` first, then `getByLabelText`, and only as a last resort `getByTestId`.
- Wait for asynchronous changes with `findBy…`, not with fixed timeouts.
- Restore the real `fetch` after each test with `vi.unstubAllGlobals()`, for example in `src/test/setup.ts`.
- Also check that a request does **not** happen, for example on a validation error: `expect(fetchSpy).not.toHaveBeenCalled()`.

If many tests need the same API, or you also want to develop in the browser against a fake API, [Mock Service Worker (MSW)](https://mswjs.io) is worth it. For one form, the `fetch` spy is enough.

## Exercise

Lesson **Test what users see and do** (`react-testing`): [examples/testing](examples/testing/README.md)

The earlier version of this chapter (Jest, Enzyme) is in [archive/chapters/10-testing.md](archive/chapters/10-testing.md).
