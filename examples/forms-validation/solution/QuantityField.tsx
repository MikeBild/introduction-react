import type { CartItem } from '../src/cart';
import type { FieldErrors } from '../src/fieldErrors';

type QuantityFieldProps = {
  item: CartItem;
  index: number;
  label: string;
  errors: FieldErrors;
};

// Der Schlüssel des Errors folgt dem Pfad im Schema: items.0.quantity
export const QuantityField = ({
  item,
  index,
  label,
  errors,
}: QuantityFieldProps) => {
  const error = errors[`items.${index}.quantity`];
  const errorId = `${item.productId}-error`;
  return (
    <div>
      <label htmlFor={item.productId}>{label}</label>
      <input
        id={item.productId}
        name={item.productId}
        inputMode="numeric"
        defaultValue={item.quantity}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error && <p id={errorId}>{error}</p>}
    </div>
  );
};
