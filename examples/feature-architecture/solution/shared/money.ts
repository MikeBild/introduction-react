// Workshop shop: money always in whole cents.
const euro = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});

export const formatCents = (cents: number) => euro.format(cents / 100);
