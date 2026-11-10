import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

// Exercise react-custom-hooks: create src/useDebouncedValue.ts, import the
// Hook here and remove .skip.
// import { useDebouncedValue } from './useDebouncedValue';
const useDebouncedValue = <T>(value: T, _delayMs: number): T => value;

it.skip('returns the new value only after the delay', () => {
  const { result, rerender } = renderHook(
    ({ value }) => useDebouncedValue(value, 300),
    { initialProps: { value: 'a' } }
  );
  rerender({ value: 'ab' });
  expect(result.current).toBe('a');
  act(() => vi.advanceTimersByTime(300));
  expect(result.current).toBe('ab');
});

it.skip('restarts the wait time on every change', () => {
  const { result, rerender } = renderHook(
    ({ value }) => useDebouncedValue(value, 300),
    { initialProps: { value: 1 } }
  );
  rerender({ value: 2 });
  act(() => vi.advanceTimersByTime(200));
  rerender({ value: 3 });
  act(() => vi.advanceTimersByTime(200));
  expect(result.current).toBe(1);
  act(() => vi.advanceTimersByTime(100));
  expect(result.current).toBe(3);
});
