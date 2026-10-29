import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import type { Order } from '../src/ordersApi';
import { OrderPanel } from './OrderPanel';

const ada = { id: 'c1', firstName: 'Ada', lastName: 'Lovelace' };
const grace = { id: 'c2', firstName: 'Grace', lastName: 'Hopper' };
const adaOrders: readonly Order[] = [{ id: 'o1', productName: 'Kaffeebohnen' }];
const graceOrders: readonly Order[] = [
  { id: 'o3', productName: 'Milchkännchen' },
];

afterEach(() => {
  vi.useRealTimers();
});

it('zeigt Name und Bestellungen', async () => {
  render(
    <OrderPanel
      customer={ada}
      loadOrders={() => Promise.resolve(adaOrders)}
      onReorder={() => {}}
    />
  );
  expect(
    screen.getByRole('heading', { name: 'Bestellungen von Ada Lovelace' })
  ).toBeInTheDocument();
  expect(await screen.findByText('Kaffeebohnen')).toBeInTheDocument();
});

it('bestellt bei jedem Klick erneut', async () => {
  const onReorder = vi.fn();
  render(
    <OrderPanel
      customer={ada}
      loadOrders={() => Promise.resolve(adaOrders)}
      onReorder={onReorder}
    />
  );
  const button = await screen.findByRole('button', {
    name: 'Kaffeebohnen erneut bestellen',
  });
  fireEvent.click(button);
  fireEvent.click(button);
  expect(onReorder).toHaveBeenCalledTimes(2);
});

it('räumt das Interval beim Unmount auf', () => {
  vi.useFakeTimers();
  const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval');
  const { unmount } = render(
    <OrderPanel
      customer={ada}
      loadOrders={() => new Promise(() => {})}
      onReorder={() => {}}
    />
  );
  act(() => vi.advanceTimersByTime(3000));
  expect(screen.getByText('Seit 3 Sekunden geöffnet')).toBeInTheDocument();
  unmount();
  expect(clearIntervalSpy).toHaveBeenCalled();
});

it('ignoriert die Antwort für einen alten Kunden', async () => {
  const pending = new Map<string, (orders: readonly Order[]) => void>();
  const loadOrders = (customerId: string) =>
    new Promise<readonly Order[]>((resolve) =>
      pending.set(customerId, resolve)
    );
  const { rerender } = render(
    <OrderPanel customer={ada} loadOrders={loadOrders} onReorder={() => {}} />
  );
  rerender(
    <OrderPanel customer={grace} loadOrders={loadOrders} onReorder={() => {}} />
  );
  await act(async () => pending.get('c2')?.(graceOrders));
  await act(async () => pending.get('c1')?.(adaOrders));
  expect(screen.getByText('Milchkännchen')).toBeInTheDocument();
  expect(screen.queryByText('Kaffeebohnen')).not.toBeInTheDocument();
});

it('bricht den Request beim Unmount ab', () => {
  const signals: AbortSignal[] = [];
  const { unmount } = render(
    <OrderPanel
      customer={ada}
      loadOrders={(_customerId, signal) => {
        if (signal) signals.push(signal);
        return new Promise(() => {});
      }}
      onReorder={() => {}}
    />
  );
  unmount();
  expect(signals.at(-1)?.aborted).toBe(true);
});
