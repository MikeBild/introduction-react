import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { searchCatalog } from '../src/catalog';
import { createProductSearch } from './createProductSearch';

// The stream can be tested without React – with fake timers for debounceTime.
beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
});

const mockProducts = () =>
  vi
    .spyOn(globalThis, 'fetch')
    .mockImplementation(async (input) =>
      Response.json(
        searchCatalog(
          new URL(String(input), 'http://localhost').searchParams.get('q') ?? ''
        )
      )
    );

it('sends only one request while typing fast', async () => {
  const fetchSpy = mockProducts();
  const productSearch = createProductSearch();
  const results: string[][] = [];
  const subscription = productSearch.results$.subscribe((products) =>
    results.push(products.map((product) => product.name))
  );
  productSearch.search('h');
  productSearch.search('ham');
  productSearch.search('hammer');
  await vi.advanceTimersByTimeAsync(300);
  expect(fetchSpy).toHaveBeenCalledTimes(1);
  expect(results).toEqual([['Schlosserhammer', 'Gummihammer', 'Bohrhammer']]);
  subscription.unsubscribe();
});

it('ignores the same search text a second time', async () => {
  const fetchSpy = mockProducts();
  const productSearch = createProductSearch();
  const subscription = productSearch.results$.subscribe();
  productSearch.search('hammer');
  await vi.advanceTimersByTimeAsync(300);
  productSearch.search('hammer');
  await vi.advanceTimersByTimeAsync(300);
  expect(fetchSpy).toHaveBeenCalledTimes(1);
  subscription.unsubscribe();
});

it('turns a network error into an empty list', async () => {
  vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('offline'));
  const productSearch = createProductSearch();
  const results: unknown[] = [];
  const subscription = productSearch.results$.subscribe((products) =>
    results.push(products)
  );
  productSearch.search('hammer');
  await vi.advanceTimersByTimeAsync(300);
  expect(results).toEqual([[]]);
  subscription.unsubscribe();
});
