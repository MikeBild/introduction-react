import { vi } from 'vitest';

// Ersetzt fetch für einen Test: Jeder Aufruf bekommt eine frische JSON-Response.
// Der Rückgabewert ist der Mock – damit prüfst du, ob und wie fetch gerufen wurde.
// Die Setup-Datei stellt das echte fetch nach jedem Test mit vi.unstubAllGlobals() wieder her.
export const mockFetchResponse = (status: number, body: unknown) => {
  const fetchMock = vi.fn(async () => Response.json(body, { status }));
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};
