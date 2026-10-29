import { act } from '@testing-library/react';
import { vi } from 'vitest';

type PendingRequest = {
  search: string;
  signal: AbortSignal | undefined;
  resolve: (response: Response) => void;
};

// Ersetzt fetch durch Requests, die du im Test selbst beantwortest –
// in beliebiger Reihenfolge. Ein abgebrochener Request lehnt mit AbortError ab.
export const controlFetch = () => {
  const requests: PendingRequest[] = [];
  const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(
    (input, init) =>
      new Promise<Response>((resolve, reject) => {
        const url = new URL(
          input instanceof Request ? input.url : String(input),
          'http://localhost'
        );
        const signal = init?.signal ?? undefined;
        signal?.addEventListener('abort', () =>
          reject(new DOMException('Aborted', 'AbortError'))
        );
        requests.push({
          search: url.searchParams.get('q') ?? '',
          signal,
          resolve,
        });
      })
  );

  const findRequest = (search: string) => {
    const request = requests.findLast((pending) => pending.search === search);
    if (!request) throw new Error(`Kein Request für „${search}“`);
    return request;
  };

  const respond = async (search: string, status: number, body: unknown) => {
    await act(async () => {
      findRequest(search).resolve(Response.json(body, { status }));
    });
  };

  return { fetchSpy, findRequest, respond };
};
