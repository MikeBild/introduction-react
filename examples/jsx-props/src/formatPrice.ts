export const formatPrice = (amountInCents: number) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
    amountInCents / 100
  );
