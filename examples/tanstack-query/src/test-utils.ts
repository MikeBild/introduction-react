import { vi } from 'vitest';
import { createShopApi } from './fakeApi';

// Leitet fetch auf die Fake-API um. Jeder Test bekommt frische Bestellungen.
export const mockShopApi = () => {
  const handle = createShopApi();
  const fetchSpy = vi
    .spyOn(globalThis, 'fetch')
    .mockImplementation(async (input, init) => {
      const url = new URL(
        input instanceof Request ? input.url : String(input),
        'http://localhost'
      );
      const bodyText = typeof init?.body === 'string' ? init.body : '';
      const { status, body } = handle(init?.method ?? 'GET', url, bodyText);
      return Response.json(body, { status });
    });

  // Zählt Requests, etwa requestCount('GET', '/api/products?q=').
  const requestCount = (method: string, pathAndQuery: string) =>
    fetchSpy.mock.calls.filter(([input, init]) => {
      const url = new URL(String(input), 'http://localhost');
      return (
        (init?.method ?? 'GET') === method &&
        `${url.pathname}${url.search}` === pathAndQuery
      );
    }).length;

  return { fetchSpy, requestCount };
};
