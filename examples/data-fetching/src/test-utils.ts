import { vi } from 'vitest';

type MockResponse = { status?: number; body: unknown };

// Ersetzt fetch: Der erste Aufruf bekommt die erste Response, der zweite die
// zweite usw. Die letzte gilt für alle weiteren Aufrufe.
export const mockFetchResponses = (...responses: readonly MockResponse[]) => {
  let callCount = 0;
  return vi.spyOn(globalThis, 'fetch').mockImplementation(() => {
    const { status = 200, body } = responses[
      Math.min(callCount, responses.length - 1)
    ] ?? { body: null };
    callCount += 1;
    return Promise.resolve(
      new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });
};

export const testProducts = [
  { id: 'p1', name: 'Kaffeebohnen', priceInCents: 1290 },
  { id: 'p2', name: 'Handmühle', priceInCents: 4900 },
];
