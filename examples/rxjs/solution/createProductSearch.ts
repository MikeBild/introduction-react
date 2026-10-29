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

// Wirft bei unerwarteter Antwort, etwa dem Fehler-JSON eines HTTP 500.
const toProducts = (data: unknown): Product[] => {
  if (!Array.isArray(data) || !data.every(isProduct))
    throw new Error('Unerwartete Antwort');
  return data;
};

// Die Suche als Stream – ohne React, ohne JSX.
export const createProductSearch = () => {
  const input$ = new Subject<string>();
  const results$ = input$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    // switchMap kündigt die laufende Suche, fromFetch bricht dabei den Request ab.
    switchMap((search) =>
      fromFetch(`/api/products?q=${encodeURIComponent(search)}`, {
        selector: (response) => response.json(),
      }).pipe(
        map(toProducts),
        // Im inneren Stream abfangen, sonst endet die ganze Suche.
        catchError(() => of([]))
      )
    )
  );
  return { search: (text: string) => input$.next(text), results$ };
};
