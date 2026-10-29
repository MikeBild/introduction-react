import type { OrderStatus } from './shop';

export const statusLabels: Record<OrderStatus, string> = {
  draft: 'Entwurf',
  placed: 'Bestellt',
  paid: 'Bezahlt',
  shipped: 'Versendet',
  cancelled: 'Storniert',
};
