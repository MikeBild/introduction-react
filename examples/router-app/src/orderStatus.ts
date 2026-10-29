import type { OrderStatus } from './shop';

export const statuses = [
  'draft',
  'placed',
  'paid',
  'shipped',
  'cancelled',
] as const satisfies readonly OrderStatus[];

export const statusLabels: Record<OrderStatus, string> = {
  draft: 'Entwurf',
  placed: 'Bestellt',
  paid: 'Bezahlt',
  shipped: 'Versendet',
  cancelled: 'Storniert',
};

// Search Params sind Eingaben von außen: Jeder Wert wird geprüft.
export const readStatus = (value: string | null) =>
  statuses.find((status) => status === value) ?? 'all';
