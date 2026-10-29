const euroFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
});

export const formatPrice = (priceInCents: number) =>
  euroFormat.format(priceInCents / 100);
