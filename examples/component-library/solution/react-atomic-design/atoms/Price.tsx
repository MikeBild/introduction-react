const euroFormat = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});

export const Price = ({ amountInCents }: { amountInCents: number }) => (
  <span>{euroFormat.format(amountInCents / 100)}</span>
);
