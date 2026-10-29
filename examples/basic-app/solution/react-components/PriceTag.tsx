type PriceTagProps = { amountInCents: number; currency?: 'EUR' | 'USD' };

export const PriceTag = ({
  amountInCents,
  currency = 'EUR',
}: PriceTagProps) => (
  <span>
    {new Intl.NumberFormat('de-DE', { style: 'currency', currency }).format(
      amountInCents / 100
    )}
  </span>
);
