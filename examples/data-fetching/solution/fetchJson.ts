export type FetchError = 'http' | 'invalid' | 'network';

// Ein Error ist hier ein normales Ergebnis – so braucht die Seite
// keine Error Boundary, um ihn anzuzeigen.
export type FetchResult<T> =
  { ok: true; data: T } | { ok: false; error: FetchError };

export const fetchJson = async <T>(
  url: string,
  isValid: (value: unknown) => value is T
): Promise<FetchResult<T>> => {
  try {
    const response = await fetch(url);
    if (!response.ok) return { ok: false, error: 'http' };
    const body: unknown = await response.json();
    return isValid(body)
      ? { ok: true, data: body }
      : { ok: false, error: 'invalid' };
  } catch {
    return { ok: false, error: 'network' };
  }
};
