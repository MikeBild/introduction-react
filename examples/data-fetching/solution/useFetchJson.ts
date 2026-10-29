import { useState, useTransition } from 'react';
import { fetchJson, type FetchResult } from './fetchJson';

type FetchJson<T> = {
  promise: Promise<FetchResult<T>>;
  reload: () => void;
  isReloading: boolean;
};

// Erzeugt das Promise einmal pro Mount – in einer Component AUSSERHALB von
// Suspense. Würde die suspendierende Component es selbst erzeugen, bekäme sie
// bei jedem Versuch ein neues Promise und lüde endlos.
export const useFetchJson = <T>(
  url: string,
  isValid: (value: unknown) => value is T
): FetchJson<T> => {
  const [promise, setPromise] = useState(() => fetchJson(url, isValid));
  const [isReloading, startTransition] = useTransition();
  // Als Transition bleibt die alte Liste sichtbar, bis die neue da ist.
  const reload = () =>
    startTransition(() => setPromise(fetchJson(url, isValid)));
  return { promise, reload, isReloading };
};
