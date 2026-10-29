import { vi } from 'vitest';

// Ersetzt fetch für einen Test: Jeder Aufruf bekommt eine frische JSON-Response.
// Der Rückgabewert ist der Spy – damit prüfst du, ob und wie fetch gerufen wurde.
export const mockFetchResponse = (status: number, body: unknown) =>
  vi.spyOn(globalThis, 'fetch').mockImplementation(() =>
    Promise.resolve(
      new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' },
      })
    )
  );
