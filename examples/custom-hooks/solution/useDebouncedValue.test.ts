import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { useDebouncedValue } from './useDebouncedValue';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it('liefert den neuen Wert erst nach der Verzögerung', () => {
  const { result, rerender } = renderHook(
    ({ value }) => useDebouncedValue(value, 300),
    { initialProps: { value: 'a' } }
  );
  rerender({ value: 'ab' });
  expect(result.current).toBe('a');
  act(() => vi.advanceTimersByTime(300));
  expect(result.current).toBe('ab');
});

it('startet die Wartezeit bei jeder Änderung neu', () => {
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
