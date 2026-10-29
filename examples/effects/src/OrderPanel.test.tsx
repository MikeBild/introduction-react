import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { customers, orders, type CustomerId, type Order } from './shop';
import { OrderPanel } from './OrderPanel';

const [ada, tom] = customers;
const adaOrders = orders.filter((order) => order.customerId === ada.id);
const tomOrders = orders.filter((order) => order.customerId === tom.id);

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
    screen.getByRole('heading', { name: 'Bestellungen von Ada Schmidt' })
  ).toBeInTheDocument();
  expect(await screen.findByText('Summe: 109,80 €')).toBeInTheDocument();
});

// Übung react-effects: .skip Schritt für Schritt entfernen
it.skip('bestellt bei jedem Klick erneut', async () => {
  const onReorder = vi.fn();
  render(
    <OrderPanel
      customer={ada}
      loadOrders={() => Promise.resolve(adaOrders)}
      onReorder={onReorder}
    />
  );
  const button = await screen.findByRole('button', {
    name: 'Bestellung o1001 erneut bestellen',
  });
  fireEvent.click(button);
  fireEvent.click(button);
  expect(onReorder).toHaveBeenCalledTimes(2);
});

it.skip('räumt das Interval beim Unmount auf', () => {
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

it.skip('ignoriert die Antwort für einen alten Kunden', async () => {
  const pending = new Map<CustomerId, (orders: readonly Order[]) => void>();
  const loadOrders = (customerId: CustomerId) =>
    new Promise<readonly Order[]>((resolve) =>
      pending.set(customerId, resolve)
    );
  const { rerender } = render(
    <OrderPanel customer={ada} loadOrders={loadOrders} onReorder={() => {}} />
  );
  rerender(
    <OrderPanel customer={tom} loadOrders={loadOrders} onReorder={() => {}} />
  );
  await act(async () => pending.get(tom.id)?.(tomOrders));
  await act(async () => pending.get(ada.id)?.(adaOrders));
  expect(
    screen.getByRole('button', { name: 'Bestellung o1002 erneut bestellen' })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: 'Bestellung o1001 erneut bestellen' })
  ).not.toBeInTheDocument();
});

it.skip('bricht den Request beim Unmount ab', () => {
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
