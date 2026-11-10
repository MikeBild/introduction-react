import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import type { Product } from '../src/shop';

const isProduct = (value: unknown): value is Product =>
  typeof value === 'object' &&
  value !== null &&
  'id' in value &&
  'name' in value &&
  'priceCents' in value &&
  'stock' in value;

// Throws on an unexpected response, such as the error JSON of an HTTP 500.
const toProducts = (data: unknown): Product[] => {
  if (!Array.isArray(data) || !data.every(isProduct))
    throw new Error('Unerwartete Antwort');
  return data;
};

// The search as a stream – without React, without JSX.
export const createProductSearch = () => {
  const input$ = new Subject<string>();
  const results$ = input$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    // switchMap unsubscribes from the running search, and fromFetch aborts the request.
    switchMap((search) =>
      fromFetch(`/api/products?q=${encodeURIComponent(search)}`, {
        selector: (response) => response.json(),
      }).pipe(
        map(toProducts),
        // Catch it in the inner stream, otherwise the whole search ends.
        catchError(() => of([]))
      )
    )
  );
  return { search: (text: string) => input$.next(text), results$ };
};
