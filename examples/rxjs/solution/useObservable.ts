import { useEffect, useState } from 'react';
import type { Observable } from 'rxjs';

// Abonniert im Effect, kündigt im Cleanup. React sieht nur den letzten Wert.
export function useObservable<T>(source$: Observable<T>, initialValue: T): T {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    const subscription = source$.subscribe(setValue);
    return () => subscription.unsubscribe();
  }, [source$]);
  return value;
}
