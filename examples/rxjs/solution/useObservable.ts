import { useEffect, useState } from 'react';
import type { Observable } from 'rxjs';

// Subscribes in the Effect, unsubscribes in the Cleanup. React only sees the latest value.
export function useObservable<T>(source$: Observable<T>, initialValue: T): T {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    const subscription = source$.subscribe(setValue);
    return () => subscription.unsubscribe();
  }, [source$]);
  return value;
}
