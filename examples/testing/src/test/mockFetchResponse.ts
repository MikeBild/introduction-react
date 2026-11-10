import { vi } from 'vitest';

// Replaces fetch for one test: every call gets a fresh JSON response.
// The return value is the mock – use it to check whether and how fetch was called.
// The setup file restores the real fetch after every test with vi.unstubAllGlobals().
export const mockFetchResponse = (status: number, body: unknown) => {
  const fetchMock = vi.fn(async () => Response.json(body, { status }));
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};
