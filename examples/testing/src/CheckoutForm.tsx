import { useState, type SubmitEvent } from 'react';
import type { CartItem } from './cart';
import { toFieldErrors, type FieldErrors } from './fieldErrors';
import { PlaceOrderInput } from './placeOrderInput';
import { customers, products } from './shop';

const productName = (item: CartItem) =>
  products.find((product) => product.id === item.productId)?.name ??
  item.productId;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

// POST /api/orders mit dem geteilten Schema. Bei 409 meldet der Server
// den Pfad des Felds, z. B. { path: 'items.0.quantity', message: '…' }.
const sendOrder = async (input: PlaceOrderInput) => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const body: unknown = await response.json().catch(() => null);
  if (response.ok && isRecord(body) && typeof body.id === 'string')
    return { kind: 'placed' as const, orderId: body.id };
  if (
    response.status === 409 &&
    isRecord(body) &&
    typeof body.path === 'string' &&
    typeof body.message === 'string'
  )
    return {
      kind: 'fieldError' as const,
      errors: { [body.path]: body.message },
    };
  return { kind: 'failed' as const, message: `HTTP ${response.status}` };
};

export const CheckoutForm = ({ cart }: { cart: readonly CartItem[] }) => {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = PlaceOrderInput.safeParse({
      customerId: formData.get('customerId'),
      items: cart.map((item) => ({
        productId: item.productId,
        quantity: Number(formData.get(item.productId)),
      })),
    });
    if (!result.success) return setErrors(toFieldErrors(result.error.issues));
    setErrors({});
    setFormError(null);
    setIsSubmitting(true);
    const response = await sendOrder(result.data);
    setIsSubmitting(false);
    if (response.kind === 'placed') return setPlacedOrderId(response.orderId);
    if (response.kind === 'fieldError') return setErrors(response.errors);
    setFormError(
      `Die Bestellung ist fehlgeschlagen (${response.message}). Versuch es noch einmal.`
    );
  };

  if (placedOrderId)
    return <p role="status">Bestellung {placedOrderId} ist eingegangen</p>;

  return (
    <form noValidate onSubmit={handleSubmit}>
      {formError && <p role="alert">{formError}</p>}
      <label htmlFor="customerId">Kunde</label>
      <select
        id="customerId"
        name="customerId"
        defaultValue=""
        aria-invalid={Boolean(errors.customerId)}
        aria-describedby={errors.customerId ? 'customerId-error' : undefined}
      >
        <option value="">Bitte wählen</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>
      {errors.customerId && <p id="customerId-error">{errors.customerId}</p>}

      {cart.map((item, index) => {
        const error = errors[`items.${index}.quantity`];
        const errorId = `${item.productId}-error`;
        return (
          <div key={item.productId}>
            <label htmlFor={item.productId}>Menge {productName(item)}</label>
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
      })}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Bestellung läuft …' : 'Bestellen'}
      </button>
    </form>
  );
};
